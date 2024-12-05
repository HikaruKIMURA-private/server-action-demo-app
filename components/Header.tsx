import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/app/data/auth";
import { signOut } from "@/actions/auth";
import { ModeToggle } from "./ModeToggle";

export async function Header() {
  const user = await currentUser();

  return (
    <header className="h-16 gap-4 border-b px-6 flex items-center">
      <Button asChild variant="ghost" className="font-bold text-xl">
        <Link href="/">LOGO</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/items">商品一覧</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/mypage">マイページ</Link>
      </Button>

      <span className="flex-1" />

      {user ? (
        <form action={signOut}>
          <Button variant="outline">ログアウト</Button>
        </form>
      ) : (
        <Link href="/login">ログイン</Link>
      )}
      <ModeToggle />
    </header>
  );
}
