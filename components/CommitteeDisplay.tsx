import ReactCountryFlag from 'react-country-flag';
import { Committee, Member } from '../utils/types';
import { getDisplayMemberRole } from '../utils/utils';

interface CommitteeProps {
  committee: Committee;
}

export default function CommitteeDisplay({ committee }: CommitteeProps) {
  const groupedMembers: Member[][] = [];
  committee
    .filter((m) => !m.past)
    .forEach((member, index) => {
      let i = Math.floor(index / 3);
      if (groupedMembers[i] == undefined) groupedMembers[i] = [];
      groupedMembers[i].push(member);
    });

  return (
    <div className="flex flex-col w-4/5 gap-10">
      <h1 className="text-4xl text-center">ISC Dynamic Committee</h1>
      <div className="flex flex-col gap-10">
        {groupedMembers.map((members, i) => (
          <div
            className="flex flex-col home:flex-row home:items-center flex-wrap gap-10"
            key={i}
          >
            {members.map((member, j) => (
              <div
                className="flex flex-1 flex-row gap-4 items-center justify-start"
                key={j}
              >
                <ReactCountryFlag
                  style={{
                    width: '2em',
                    height: '2em',
                  }}
                  countryCode={member.countryCode}
                  svg
                />
                <p className="text-center text-lg whitespace-nowrap">
                  {member.lastName.toUpperCase()} {member.firstName}
                  {member.role && ` - ${getDisplayMemberRole(member)}`}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
