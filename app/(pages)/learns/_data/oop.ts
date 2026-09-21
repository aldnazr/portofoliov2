import type { LearnConcept } from "./types";

export const oopConcepts: LearnConcept[] = [
  {
    id: "encapsulation",
    title: "Encapsulation",
    description:
      "Encapsulation membungkus data dan perilaku dalam satu class, lalu membatasi aksesnya melalui modifier private, protected, dan public. Getter dan setter menjaga agar state internal tetap valid.",
    filename: "encapsulation.ts",
    code: `class BankAccount {
  // private: hanya bisa diakses dari dalam class ini
  private balance: number;
  // readonly: hanya bisa diberi nilai saat konstruksi
  readonly owner: string;

  constructor(owner: string, initialBalance = 0) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  // public (default): bisa diakses dari mana saja
  public deposit(amount: number): void {
    if (amount <= 0) throw new Error("Nominal harus positif");
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount > this.balance) throw new Error("Saldo tidak cukup");
    this.balance -= amount;
  }

  // Getter: akses baca seperti property, tetapi melalui method
  public get currentBalance(): number {
    return this.balance;
  }

  // Setter: validasi sebelum nilai diubah
  public set setBalance(amount: number) {
    if (amount < 0) throw new Error("Saldo tidak boleh negatif");
    this.balance = amount;
  }
}

const account = new BankAccount("Alauddin", 50_000);
account.deposit(25_000);
account.currentBalance; // 75000
// account.balance; // Error: property 'balance' bersifat private
`,
  },
  {
    id: "inheritance",
    title: "Inheritance",
    description:
      "Inheritance membuat class mewarisi properti dan method dari class induk menggunakan extends dan super. Modifier protected memungkinkan subclass mengakses anggota class induk tanpa mengeksposnya ke luar.",
    filename: "inheritance.ts",
    code: `class Animal {
  constructor(protected name: string) {} // protected: bisa dipakai subclass

  // Method yang diwariskan ke semua subclass
  public describe(): string {
    return \`\${this.name} adalah hewan\`;
  }

  // protected: hanya bisa dipakai oleh class turunannya
  protected makeSound(): string {
    return "Suara hewan";
  }
}

class Dog extends Animal {
  // 'super' wajib dipanggil sebelum mengakses 'this'
  constructor(name: string, private breed: string) {
    super(name);
  }

  public bark(): string {
    // Akses protected member milik class induk
    return \`\${this.makeSound()} — gonggongan\`;
  }

  public describe(): string {
    // super.method() memanggil implementasi class induk
    return \`\${super.describe()}, ras \${this.breed}\`;
  }
}

const dog = new Dog("Bruno", "Shiba Inu");
dog.describe(); // Bruno adalah hewan, ras Shiba Inu
dog.bark(); // Suara hewan — gonggongan
`,
  },
  {
    id: "polymorphism-overriding",
    title: "Polymorphism — Overriding",
    description:
      "Overriding adalah kemampuan subclass menulis ulang method yang ada di class induk. Saat dipanggil melalui tipe class induk, versi subclass yang akan dijalankan (dynamic dispatch).",
    filename: "polymorphism-overriding.ts",
    code: `class Shape {
  constructor(public name: string) {}

  public area(): number {
    return 0;
  }

  public toString(): string {
    return \`\${this.name}: \${this.area().toFixed(2)} satuan\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super("Lingkaran");
  }

  // override: menimpa method area() milik class induk
  public area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super("Persegi panjang");
  }

  public area(): number {
    return this.width * this.height;
  }
}

// Tipe dideklarasikan sebagai Shape, tapi method yang berjalan
// disesuaikan dengan class asli objeknya
const shapes: Shape[] = [new Circle(7), new Rectangle(4, 5)];

shapes.map((shape) => shape.toString());
// ["Lingkaran: 153.94 satuan", "Persegi panjang: 20.00 satuan"]
`,
  },

  {
    id: "polymorphism-overloading",
    title: "Polymorphism — Overloading",
    description:
      "Overloading adalah pendefinisian beberapa signature method dengan nama yang sama, namun parameter yang berbeda. TypeScript memilih signature yang cocok berdasarkan tipe argumen saat compile-time.",
    filename: "polymorphism-overloading.ts",
    code: `class Messenger {
  // Signature 1: hanya pesan teks
  public send(recipient: string, message: string): void;
  // Signature 2: pesan teks dengan lampiran
  public send(recipient: string, message: string, attachment: File): void;
  // Signature 3: broadcast ke beberapa penerima
  public send(recipients: string[], message: string): void;

  // Satu implementasi yang menangani seluruh signature
  public send(
    recipientOrRecipients: string | string[],
    message: string,
    attachment?: File,
  ): void {
    const targets = Array.isArray(recipientOrRecipients) ?
      recipientOrRecipients
    : [recipientOrRecipients];

    targets.forEach((target) => {
      const extra = attachment ? \` + "\${attachment.name}"\` : "";
      console.log(\`Kirim ke \${target}: \${message}\${extra}\`);
    });
  }
}

const messenger = new Messenger();
messenger.send("aldnazr", "Halo"); // signature 1
messenger.send("aldnazr", "Halo", new File([], "cv.pdf")); // signature 2
messenger.send(["aldo", "sari"], "Halo semua"); // signature 3
`,
  },
  {
    id: "abstraction",
    title: "Abstraction",
    description:
      "Abstraction menyembunyikan detail implementasi dan hanya menampilkan perilaku penting. Abstract class dan interface menyediakan kontrak yang wajib diikuti oleh class turunannya.",
    filename: "abstraction.ts",
    code: `// Interface: kontrak murni, tanpa implementasi
interface Report {
  readonly title: string;
  generate(): string;
}

// Abstract class: bisa punya implementasi + method abstract
abstract class BaseReport implements Report {
  constructor(public readonly title: string) {}

  // Wajib diimplementasikan oleh subclass
  protected abstract collectData(): unknown[];

  // Sudah diimplementasikan, bisa langsung dipakai subclass
  public generate(): string {
    const data = this.collectData();
    return \`Laporan "\${this.title}": \${data.length} baris\`;
  }
}

class SalesReport extends BaseReport {
  protected collectData(): unknown[] {
    return [{ product: "Laptop", total: 15 }];
  }
}

class VisitorReport extends BaseReport {
  protected collectData(): unknown[] {
    return [{ visitor: 1 }, { visitor: 2 }];
  }
}

const reports: Report[] = [
  new SalesReport("Penjualan"),
  new VisitorReport("Pengunjung"),
];

reports.forEach((report) => report.generate());
// Laporan "Penjualan": 1 baris
// Laporan "Pengunjung": 2 baris
`,
  },
];
