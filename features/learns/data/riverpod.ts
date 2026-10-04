import type { LearnConcept } from "./types";

export const riverpodConcepts: LearnConcept[] = [
  {
    id: "riverpod-provider",
    title: "Membuat Provider",
    meta: "@Riverpod",
    description:
      "Provider dideklarasikan dengan annotation, lalu build_runner menghasilkan file .g.dart berisi base class _$Session yang menyediakan state dan ref. Nama provider dibuat otomatis dari nama class atau fungsi: Session menjadi sessionProvider. @riverpod biasa bersifat autoDispose, state dibuang saat tidak ada yang listen; untuk sesi atau preferensi global pakai @Riverpod(keepAlive: true). Action berupa method di class yang sama, dan state diganti dengan nilai baru, bukan dimutasi. Jalankan build_runner ulang setiap menambah atau mengubah provider. Padanan di Zustand: create().",
    filename: "session_provider.dart",
    language: "dart",
    code: `import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'session_provider.g.dart'; // hasil generate, jangan diedit manual

class SessionState {
  const SessionState({this.open = false});
  final bool open;
}

@Riverpod(keepAlive: true) // state global, jangan di-dispose
class Session extends _$Session {
  @override
  SessionState build() => const SessionState();

  void showSessionExpired() => state = const SessionState(open: true);
  void hideSessionExpired() => state = const SessionState(open: false);
}
`,
    examples: [
      {
        filename: "Terminal",
        language: "bash",
        code: `flutter pub add flutter_riverpod riverpod_annotation dev:build_runner dev:riverpod_generator

# generate ulang otomatis saat file provider berubah
dart run build_runner watch -d
`,
      },
    ],
  },
  {
    id: "riverpod-subscribe",
    title: "Subscribe",
    meta: "ref.watch",
    description:
      "ref.watch membaca nilai sekaligus berlangganan, jadi tempatnya di build: widget atau provider lain ikut di-rebuild saat nilainya berubah. Bentuk .select membatasi rebuild ke satu potongan state, setara selector di Zustand. ref.watch ke seluruh state tanpa select membuat widget rebuild setiap kali apa pun berubah, jadi pilih potongan yang benar-benar dirender. ref.watch di dalam callback salah tempat, di callback pakai ref.read. Padanan di Zustand: useStore(selector).",
    filename: "session_banner.dart",
    language: "dart",
    code: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'session_provider.dart';

class SessionBanner extends ConsumerWidget {
  const SessionBanner({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // select: rebuild hanya saat \`open\` berubah
    final open = ref.watch(sessionProvider.select((s) => s.open));

    return Text(open ? 'Sesi berakhir' : 'Sesi aktif');
  }
}
`,
    examples: [
      {
        filename: "session_screen.dart",
        language: "dart",
        code: `// seluruh state: rebuild saat apa pun di SessionState berubah
final session = ref.watch(sessionProvider);
`,
      },
    ],
  },
  {
    id: "riverpod-read",
    title: "Baca Sekali",
    meta: "ref.read",
    description:
      "ref.read membaca nilai saat itu juga tanpa subscribe, jadi tempatnya di callback seperti onPressed, bukan di build. Nilainya dipakai sekali saat itu juga, misalnya untuk mengecek apakah dialog masih tampil sebelum melanjutkan. Untuk memanggil method, ambil notifier lewat .notifier (bahasannya ada di konsep Ubah State). Dua kesalahan umum: ref.read di build untuk nilai yang dirender, UI tidak akan update; dan ref.watch di dalam callback, salah tempat. Padanan di Zustand: getState().",
    filename: "session_detail.dart",
    language: "dart",
    code: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'session_provider.dart';

class SessionDetail extends ConsumerWidget {
  const SessionDetail({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ElevatedButton(
      onPressed: () {
        // baca nilai saat ini, sekali, tanpa subscribe
        if (ref.read(sessionProvider).open) return; // dialog masih tampil
        // lanjutkan proses...
      },
      child: const Text('Coba lagi'),
    );
  }
}
`,
    examples: [
      {
        filename: "session_snapshot.dart",
        language: "dart",
        code: `// baca seluruh state sekaligus, bukan untuk dirender
final session = ref.read(sessionProvider);
print(session.open);
`,
      },
    ],
  },
  {
    id: "riverpod-write",
    title: "Ubah State",
    meta: "notifier.action()",
    description:
      "Mengubah state terjadi di dalam notifier: tulis method action lalu ganti nilai state. Tidak ada penggabungan seperti setState di Zustand, satu assignment mengganti seluruh state, jadi field lain harus ikut disalin kalau model punya lebih dari satu field. Dari UI, action dipanggil sekali lewat ref.read(provider.notifier).action() di dalam callback; yang kemudian di-rebuild adalah widget dengan ref.watch, bukan pemanggilnya.",
    filename: "session_banner.dart",
    language: "dart",
    code: `class SessionBanner extends ConsumerWidget {
  const SessionBanner({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ElevatedButton(
      // action dipanggil sekali lewat notifier
      onPressed: () => ref.read(sessionProvider.notifier).hideSessionExpired(),
      child: const Text('Masuk kembali'),
    );
  }
}
`,
    examples: [
      {
        filename: "session_provider.dart",
        language: "dart",
        code: `// di dalam notifier: satu assignment mengganti seluruh state, bukan merge
// kalau model punya lebih dari satu field, bawa field lama yang tidak berubah
void showSessionExpired() => state = const SessionState(open: true);

void hideSessionExpired() => state = const SessionState(open: false);
`,
      },
    ],
  },
  {
    id: "riverpod-listen",
    title: "Listener",
    meta: "ref.listen",
    description:
      "ref.listen menjalankan callback (prev, next) setiap nilai berubah tanpa membangun ulang widget, cocok untuk dialog, snackbar, navigasi, atau analytics. Dipanggil di build dan berhenti otomatis saat widget di-dispose; kalau dipakai di luar build seperti initState, pakai listenManual. Padanan di Zustand: subscribe().",
    filename: "session_screen.dart",
    language: "dart",
    code: `// dipanggil di build(): dialog muncul saat \`open\` berubah dari false ke true
ref.listen<SessionState>(sessionProvider, (prev, next) {
  if (!(prev?.open ?? false) && next.open) {
    showDialog(context: context, builder: (_) => const SessionExpiredDialog());
  }
});
`,
    examples: [
      {
        filename: "settings_page.dart",
        language: "dart",
        code: `// di luar build() (misalnya initState): pakai listenManual
@override
void initState() {
  super.initState();
  ref.listenManual(sessionProvider, (prev, next) {
    // side effect
  });
}
`,
      },
    ],
  },
];

