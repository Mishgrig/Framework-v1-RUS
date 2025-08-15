
import Link from "next/link";
export function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-[1240px] px-4 md:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-4">
        <div>
          <div className="font-semibold">Telegram MiniApps Framework</div>
          <p className="mt-2 text-sm text-[--muted-foreground]">Legal-first, шаблоны, AI и CI/CD — запуск за 14 дней.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Продукт</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/templates">Шаблоны</Link></li>
            <li><Link href="/methodology">Методология</Link></li>
            <li><Link href="/analytics">Analytics & CI/CD</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Компания</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">О нас</Link></li>
            <li><Link href="/about/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Юридические</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy">Политика конфиденциальности</Link></li>
            <li><Link href="/terms">Условия использования</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-[--muted-foreground]">© 2025 Telegram MiniApps Framework</div>
    </footer>
  );
}
