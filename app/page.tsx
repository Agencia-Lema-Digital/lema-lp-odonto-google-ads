import { redirect } from "next/navigation";

// Redireciona raiz para /diagnostico (rota canônica da landing page)
export default function RootPage() {
  redirect("/diagnostico");
}
