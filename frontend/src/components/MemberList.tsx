import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MemberAvatar {
  src: string;
  alt: string;
  fallback: string;
}

interface MembersListProps {
  members: MemberAvatar[];
}

export default function MembersList({ members }: MembersListProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex -space-x-2">
        {members.map((m, i) => (
          <Tooltip key={i}>
            <TooltipTrigger>
              <div className="group">
                <div
                  className="
                    border-2 hover:border-primary 
                    rounded-full relative
                    z-0 transition-all duration-200 
                    group-hover:cursor-pointer group-hover:border-primary 
                    group-hover:z-10 group-hover:-translate-y-1 
                    group-hover:shadow-md
                  "
                >
                  <Avatar>
                    <AvatarImage src={m.src} alt={m.alt} />
                    <AvatarFallback>{m.fallback}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </TooltipTrigger>

            <TooltipContent side="bottom">
              <p>{m.alt}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
