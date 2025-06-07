import ProjectCard from '@/components/Card';

export default function Home() {
  return (
    <div className="p-5">
      <h1 className="font-semibold text-4xl p-4">MY PROJECTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>{<ProjectCard />}</div>
        ))}
      </div>
    </div>
  );
}
