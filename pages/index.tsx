import { GetStaticProps } from 'next';
import CommitteeDisplay from '../components/CommitteeDisplay';
import LinkButton from '../components/LinkButton';
import { LINKS } from '../utils/constants';
import { parseCommittee } from '../utils/data';
import { Committee } from '../utils/types';
import dfLogo from '../public/images/logo-border.png';
import faiLogo from '../public/images/fai-logo.png';
import Image from 'next/image';

interface HomeProps {
  committee: Committee;
}

/** A ref-label record of all the link buttons to display */
const links: Partial<Record<keyof typeof LINKS, string>> = {
  official_brackets: 'Official Tournament Brackets',
  draw_generator: 'Draw Generators',
  brackets_archive: 'Brackets Archives',
  current_official_rules: 'Current D2W & D4W Rules',
  non_official_rules: 'Non-Official Solo Speed Rules',
  rule_changes: '2022 Rules Synthesis',
  isc_fai: 'ISC FAI Website',
};

export default function Home({ committee }: HomeProps) {
  const groupedLinks: Array<typeof links> = [];
  Object.entries(links).forEach(([key, value], index) => {
    let i = Math.floor(index / 2);
    if (groupedLinks[i] == undefined) groupedLinks[i] = {};
    groupedLinks[i][key] = value;
  });

  return (
    <div className="flex flex-col text-textBright items-center py-16 gap-16">
      <div className="flex flex-col items-center gap-8 home:flex-row home:gap-16">
        <Image src={dfLogo} alt="Logo" height={180} />
        <Image src={faiLogo} alt="Logo" height={180} />
      </div>

      <div className="flex w-1/2 flex-col gap-10">
        {groupedLinks.map((links, i) => (
          <div
            className="flex flex-col gap-10 home:flex-row home:items-center"
            key={i}
          >
            {Object.entries(links).map(([ref, label], i) => (
              <LinkButton key={i} label={label} url={LINKS[ref]} />
            ))}
          </div>
        ))}
      </div>
      <CommitteeDisplay committee={committee} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      committee: parseCommittee(),
    },
  };
};
