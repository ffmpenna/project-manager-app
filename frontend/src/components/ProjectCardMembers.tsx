import MembersList from './MemberList';

const avatars = [
  { src: 'https://github.com/shadcn.png', alt: '@shadcn', fallback: 'CN' },
  { src: 'https://github.com/leerob.png', alt: '@leerob', fallback: 'LR' },
  { src: 'https://github.com/evilrabbit.png', alt: '@evil', fallback: 'ER' },
];

export function ProjectCardMembers() {
  return (
    <div>
      <span className="text-sm font-medium text-gray-500">Members</span>
      <MembersList members={avatars} />
    </div>
  );
}
