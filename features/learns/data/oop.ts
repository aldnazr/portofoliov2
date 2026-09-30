import type { LearnConcept } from "./types";

export const oopConcepts: LearnConcept[] = [
  {
    id: "encapsulation",
    title: "Encapsulation",
    description:
      "Encapsulation berarti membungkus data (field) beserta logika yang mengolahnya dalam satu class, lalu menyembunyikan data internal supaya tidak bisa diubah sembarangan dari luar. Perubahan hanya lewat method atau getter/setter yang bisa memvalidasi nilainya. Bayangkan mesin ATM: kita tidak bisa membuka brankasnya, hanya memakai tombol dengan aturan yang sudah ditentukan. Manfaatnya: data selalu valid, dan isi class bisa diubah tanpa merusak kode lain yang memakainya. Ingat: Dart tidak punya keyword private atau public. Awalan underscore (_) membuat member private per library (biasanya satu file), bukan per class.",
    filename: "encapsulation.dart",
    code: `// 1) Private (_) + getter: data bisa dibaca, tapi hanya diubah lewat method yang memvalidasi
class BankAccount {
  double _balance = 0;

  double get balance => _balance;

  void deposit(double amount) {
    if (amount <= 0) throw ArgumentError('Nominal harus positif');
    _balance += amount;
  }

  void withdraw(double amount) {
    if (amount > _balance) throw StateError('Saldo tidak cukup');
    _balance -= amount;
  }
}

// 2) Setter: validasi dulu sebelum nilai disimpan
class User {
  String _email = '';

  String get email => _email;

  set email(String value) {
    if (!value.contains('@')) throw ArgumentError('Email tidak valid');
    _email = value;
  }
}

// 3) Jangan bocorkan list internal, kembalikan versi read-only
class Cart {
  final List<String> _items = [];

  List<String> get items => List.unmodifiable(_items);

  void add(String item) => _items.add(item);
}

void main() {
  final account = BankAccount()..deposit(50000);
  print(account.balance); // 50000.0
  // account.balance = 1; // error: tidak ada setter
  // account._balance = 1; // error kalau dipanggil dari file lain (private per library)

  final user = User()..email = 'raka@mail.com';
  print(user.email); // raka@mail.com

  final cart = Cart()..add('Kopi');
  // cart.items.add('Teh'); // UnsupportedError: list tidak bisa diubah dari luar
  print(cart.items); // [Kopi]
}
`,
  },
  {
    id: "inheritance",
    title: "Inheritance",
    description:
      "Inheritance memungkinkan sebuah class (subclass) mewarisi field dan method dari class lain (superclass) lewat extends, jadi kode tidak perlu ditulis ulang. Hubungannya 'is-a': Dog adalah Animal. Subclass bisa menambah fitur baru dan memakai super untuk memanggil constructor atau method milik parent. Ingat: Dart hanya mendukung single inheritance (satu extends), dan constructor tidak ikut diwariskan sehingga harus diteruskan lewat super. Untuk berbagi kemampuan dari banyak sumber, pakai mixin (with). Hati-hati dengan hierarki yang terlalu dalam: sering kali composition lebih fleksibel daripada inheritance.",
    filename: "inheritance.dart",
    code: `class Animal {
  final String name;
  Animal(this.name);

  String describe() => '$name adalah hewan';
}

// 1) extends: Dog otomatis punya name dan describe() dari Animal
class Dog extends Animal {
  final String breed;

  Dog(super.name, this.breed); // super.name diteruskan ke constructor Animal

  void bark() => print('$name ($breed): guk guk!'); // fitur baru khusus Dog
}

// 2) super: pakai versi milik parent, lalu tambahkan sendiri
class Cat extends Animal {
  Cat(super.name);

  @override
  String describe() => '\${super.describe()} (kucing)';
}

// 3) Dart hanya boleh 1 extends. Butuh kemampuan tambahan? Pakai mixin (with)
mixin Swimmer {
  void swim() => print('Berenang...');
}

class Duck extends Animal with Swimmer {
  Duck(super.name);
}

void main() {
  final dog = Dog('Bruno', 'Shiba Inu');
  print(dog.describe()); // Bruno adalah hewan (diwariskan dari Animal)
  dog.bark(); // Bruno (Shiba Inu): guk guk!

  print(Cat('Tom').describe()); // Tom adalah hewan (kucing)
  Duck('Donald').swim(); // Berenang...
}
`,
  },
  {
    id: "polymorphism-overriding",
    title: "Polymorphism — Overriding",
    description:
      "Polymorphism artinya 'banyak bentuk': satu pemanggilan method yang sama bisa menghasilkan perilaku berbeda tergantung objek aslinya. Overriding terjadi ketika subclass menulis ulang method milik parent, ditandai dengan @override. Saat method dipanggil lewat variabel bertipe parent, Dart menjalankan versi milik subclass sesuai objek aslinya saat program berjalan (dynamic dispatch). Manfaatnya: banyak jenis objek bisa diperlakukan lewat satu tipe umum tanpa if/else per jenis, dan jenis baru bisa ditambah tanpa mengubah kode lama. Ingat: overriding = runtime polymorphism (dipilih saat program berjalan).",
    filename: "polymorphism-overriding.dart",
    code: `import 'dart:math' show pi;

class Shape {
  double area() => 0;
}

// 1) @override: subclass menulis ulang method milik parent
class Circle extends Shape {
  final double radius;
  Circle(this.radius);

  @override
  double area() => pi * radius * radius;
}

class Rectangle extends Shape {
  final double width, height;
  Rectangle(this.width, this.height);

  @override
  double area() => width * height;
}

// 2) Cukup terima tipe parent: otomatis berlaku untuk semua subclass (termasuk yang baru)
double totalArea(List<Shape> shapes) =>
    shapes.fold(0.0, (sum, shape) => sum + shape.area());

// 3) toString() juga hasil override dari class Object (induk semua class di Dart)
class Book {
  final String title;
  Book(this.title);

  @override
  String toString() => 'Book: $title';
}

void main() {
  // Tipe variabelnya Shape, tapi method yang jalan mengikuti objek aslinya
  final List<Shape> shapes = [Circle(7), Rectangle(4, 5)];
  for (final s in shapes) {
    print(s.area().toStringAsFixed(2)); // 153.94, lalu 20.00
  }
  print(totalArea(shapes).toStringAsFixed(2)); // 173.94
  print(Book('Dart')); // Book: Dart
}
`,
  },
  {
    id: "polymorphism-overloading",
    title: "Polymorphism — Overloading",
    description:
      "Overloading berarti beberapa method dalam satu class punya nama yang sama tetapi daftar parameter berbeda (jumlah, tipe, atau urutannya). Compiler memilih versi yang cocok berdasarkan argumen yang dikirim, jadi keputusannya dibuat saat compile time (static polymorphism), berbeda dengan overriding yang dipilih saat runtime. Return type saja tidak cukup untuk membedakan overload. Ingat: Dart tidak mendukung overloading, makanya contoh di bawah memakai Kotlin. Di Dart, gantinya adalah optional parameter atau named parameter.",
    filename: "polymorphism-overloading.kt",
    language: "kotlin",
    code: `class Calculator {
    // 1) Beda jumlah parameter
    fun add(a: Int, b: Int): Int = a + b
    fun add(a: Int, b: Int, c: Int): Int = a + b + c

    // 2) Beda tipe parameter
    fun add(a: Double, b: Double): Double = a + b
}

fun main() {
    val calc = Calculator()
    println(calc.add(1, 2))     // 3    -> versi (Int, Int)
    println(calc.add(1, 2, 3))  // 6    -> versi (Int, Int, Int)
    println(calc.add(1.5, 2.5)) // 4.0  -> versi (Double, Double)
}

// 3) Return type saja TIDAK cukup untuk membedakan overload:
// fun add(a: Int, b: Int): Double = ...  // ERROR: bentrok dengan add(Int, Int): Int
//
// Di Dart tidak ada overloading, gantinya pakai parameter opsional / named:
// void send(String to, String msg, {String? attachment}) { ... }
`,
  },
  {
    id: "abstraction",
    title: "Abstraction",
    description:
      "Abstraction berarti menyembunyikan detail yang rumit dan hanya menampilkan apa yang perlu diketahui pemakai. Fokusnya pada 'apa yang dilakukan', bukan 'bagaimana caranya'. Contoh: saat memanggil pay(), kita tidak perlu tahu cara kerja tiap metode pembayaran. Di Dart, abstraction dibuat dengan abstract class: tidak bisa dibuat objeknya langsung, boleh berisi abstract method (tanpa isi, wajib ditulis subclass) dan method biasa. Selain extends, setiap class di Dart juga bisa dipakai sebagai interface lewat implements (wajib menulis ulang semua member). Ingat bedanya dengan encapsulation: abstraction menyembunyikan kompleksitas (level desain), encapsulation melindungi data (level implementasi).",
    filename: "abstraction.dart",
    code: `// 1) abstract class: tentukan "APA" yang harus ada, biarkan subclass menentukan "BAGAIMANA"
abstract class PaymentMethod {
  void pay(double amount); // abstract method: tanpa isi, wajib ditulis subclass
}

class CreditCard extends PaymentMethod {
  @override
  void pay(double amount) => print('Bayar $amount pakai kartu kredit');
}

class EWallet extends PaymentMethod {
  @override
  void pay(double amount) => print('Bayar $amount pakai e-wallet');
}

// 2) abstract class juga boleh punya method biasa yang langsung dipakai subclass
abstract class Report {
  List<String> collectData(); // abstract: tiap laporan beda sumber datanya

  String generate() => 'Laporan: \${collectData().length} baris'; // sudah jadi
}

class SalesReport extends Report {
  @override
  List<String> collectData() => ['Laptop', 'Mouse'];
}

// 3) Pemakai cukup kenal abstraksinya, tidak peduli class aslinya
void checkout(PaymentMethod method, double total) => method.pay(total);

void main() {
  // PaymentMethod(); // error: abstract class tidak bisa dibuat objeknya
  checkout(CreditCard(), 50000); // Bayar 50000.0 pakai kartu kredit
  checkout(EWallet(), 50000); // Bayar 50000.0 pakai e-wallet

  print(SalesReport().generate()); // Laporan: 2 baris
}
`,
  },
];
