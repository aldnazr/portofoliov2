import type { LearnConcept } from "./types";

export const oopConcepts: LearnConcept[] = [
  {
    id: "encapsulation",
    title: "Encapsulation",
    description:
      "Encapsulation membungkus data dan perilaku dalam satu class, lalu membatasi aksesnya. Di Dart, privasi diterapkan di tingkat library menggunakan prefix underscore (_). Getter dan setter menjaga agar state internal tetap valid.",
    filename: "encapsulation.dart",
    code: `class BankAccount(final String owner, [double initialBalance = 0]) {
  // Underscore (_): private dalam lingkup library di Dart
  double _balance = initialBalance;

  // Method publik: bisa diakses dari mana saja
  void deposit(double amount) {
    if (amount <= 0) throw ArgumentError("Nominal harus positif");
    _balance += amount;
  }

  void withdraw(double amount) {
    if (amount > _balance) throw StateError("Saldo tidak cukup");
    _balance -= amount;
  }

  // Getter: akses baca property terhitung / terlindungi
  double get currentBalance => _balance;

  // Setter: validasi sebelum nilai diubah
  set setBalance(double amount) {
    if (amount < 0) throw ArgumentError("Saldo tidak boleh negatif");
    _balance = amount;
  }
}

void main() {
  final account = BankAccount("Raka", 50000);
  account.deposit(25000);
  print(account.currentBalance); // 75000.0
  // account._balance tidak dapat diakses jika di luar library ini
}
`,
  },
  {
    id: "inheritance",
    title: "Inheritance",
    description:
      "Inheritance membuat class mewarisi properti dan method dari class induk menggunakan extends dan super. Subclass dapat memanfaatkan kembali fungsionalitas class induk tanpa menduplikasi kode.",
    filename: "inheritance.dart",
    code: `class Animal(final String name) {
  // Method yang diwariskan ke semua subclass
  String describe() {
    return "\${name} adalah hewan";
  }

  String makeSound() {
    return "Suara hewan";
  }
}

// super.name meneruskan parameter ke primary constructor Animal.
class Dog(super.name, final String breed) extends Animal {
  String bark() {
    return "\${makeSound()} — gonggongan";
  }

  @override
  String describe() {
    // super.describe() memanggil implementasi class induk
    return "\${super.describe()}, ras \${breed}";
  }
}

void main() {
  final dog = Dog("Bruno", "Shiba Inu");
  print(dog.describe()); // Bruno adalah hewan, ras Shiba Inu
  print(dog.bark()); // Suara hewan — gonggongan
}
`,
  },
  {
    id: "polymorphism-overriding",
    title: "Polymorphism — Overriding",
    description:
      "Overriding adalah kemampuan subclass menulis ulang method yang ada di class induk. Menggunakan anotasi @override, saat dipanggil melalui tipe class induk, versi subclass yang akan dijalankan (dynamic dispatch).",
    filename: "polymorphism-overriding.dart",
    code: `import "dart:math" as math;

class Shape(final String name) {
  double area() => 0.0;

  @override
  String toString() {
    return "\${name}: \${area().toStringAsFixed(2)} satuan";
  }
}

class Circle(final double radius) extends Shape {
  this : super("Lingkaran");

  // @override: menimpa method area() milik class induk
  @override
  double area() => math.pi * radius * radius;
}

class Rectangle(final double width, final double height) extends Shape {
  this : super("Persegi panjang");

  @override
  double area() => width * height;
}

void main() {
  // Tipe dideklarasikan sebagai Shape, tapi method yang berjalan
  // disesuaikan dengan class asli objeknya (dynamic dispatch)
  final List<Shape> shapes = [Circle(7), Rectangle(4, 5)];

  for (final shape in shapes) {
    print(shape);
  }
  // Lingkaran: 153.94 satuan
  // Persegi panjang: 20.00 satuan
}
`,
  },

  {
    id: "polymorphism-overloading",
    title: "Polymorphism — Overloading",
    description:
      "Overloading memungkinkan beberapa method memakai nama yang sama selama daftar parameternya berbeda. Contoh ini menggunakan Kotlin karena Dart tidak mendukung method overloading tradisional.",
    filename: "polymorphism-overloading.kt",
    language: "kotlin",
    code: `class Messenger {
  fun send(recipient: String, message: String) {
    println("Kirim ke \${recipient}: \${message}")
  }

  fun send(recipient: String, message: String, attachment: String) {
    println("Kirim ke \${recipient}: \${message} + \${attachment}")
  }

  fun send(recipients: List<String>, message: String) {
    recipients.forEach { recipient ->
      println("Kirim ke \${recipient}: \${message}")
    }
  }
}

fun main() {
  val messenger = Messenger()

  messenger.send("aldnazr", "Halo")
  messenger.send("aldnazr", "Halo", "cv.pdf")
  messenger.send(listOf("aldo", "sari"), "Halo semua")
}
`,
  },
  {
    id: "abstraction",
    title: "Abstraction",
    description:
      "Abstraction menyembunyikan detail implementasi dan hanya menampilkan perilaku penting. Abstract class di Dart menyediakan kontrak yang wajib diikuti oleh class turunannya.",
    filename: "abstraction.dart",
    code: `// Di Dart, abstract class dapat berfungsi sebagai interface kontrak
abstract class Report {
  String get title;
  String generate();
}

// Abstract class dengan implementasi dasar
abstract class BaseReport(final String title) implements Report {
  // Method abstract: wajib diimplementasikan oleh subclass
  List<Map<String, dynamic>> collectData();

  // Sudah diimplementasikan, bisa langsung dipakai subclass
  @override
  String generate() {
    final data = collectData();
    return 'Laporan "\${title}": \${data.length} baris';
  }
}

class SalesReport(super.title) extends BaseReport {
  @override
  List<Map<String, dynamic>> collectData() {
    return [
      {"product": "Laptop", "total": 15},
    ];
  }
}

class VisitorReport(super.title) extends BaseReport {
  @override
  List<Map<String, dynamic>> collectData() {
    return [
      {"visitor": 1},
      {"visitor": 2},
    ];
  }
}

void main() {
  final List<Report> reports = [
    SalesReport("Penjualan"),
    VisitorReport("Pengunjung"),
  ];

  for (final report in reports) {
    print(report.generate());
  }
  // Laporan "Penjualan": 1 baris
  // Laporan "Pengunjung": 2 baris
}
`,
  },
];
