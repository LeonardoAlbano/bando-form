import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ApplicationService } from "@/server/application/application.service";
import type { Application } from "@prisma/client";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/login");
  }

  const service = new ApplicationService();
  const applications: Application[] = await service.listApplications();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Aplicações recebidas ({applications.length})
      </h1>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-3 py-2 text-left">Data</th>
              <th className="px-3 py-2 text-left">Nome</th>
              <th className="px-3 py-2 text-left">WhatsApp</th>
              <th className="px-3 py-2 text-left">Desafio</th>
              <th className="px-3 py-2 text-left">Controle</th>
              <th className="px-3 py-2 text-left">Fit</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t border-white/10">
                <td className="px-3 py-2 text-xs text-gray-300">
                  {new Date(app.createdAt).toLocaleString("pt-BR")}
                </td>
                <td className="px-3 py-2">{app.name}</td>
                <td className="px-3 py-2">{app.whatsapp}</td>
                <td className="px-3 py-2 max-w-xs truncate">
                  {app.mainChallenge}
                </td>
                <td className="px-3 py-2">{app.controlLevel}</td>
                <td className="px-3 py-2">
                  {app.finalFit === "YES" ? "Sim" : "Não"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
