import React from "react";

type Repo = {
  name: string;
  stargazers_count: number;
};

const getRepo = async () => {
  // Fetch data from external API
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo: Repo = await res.json();
  return { repo, id: 1 };
};

export default async function Page() {
  // @ts-ignore
  const { repo, id } = await getRepo();

  return (
    <main className="bg-gray-200 p-4">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Repo</th>
            <th className="px-4 py-2">Stargazers Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{repo.name}</td>
            <td className="border px-4 py-2">{repo.stargazers_count}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
