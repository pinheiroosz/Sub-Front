'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Página inicial: redireciona automaticamente para /catalogo
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/catalogo");
  }, [router]);
  return null;
}
