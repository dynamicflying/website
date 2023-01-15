import { useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Disciplines, Pattern } from '../utils/types';
import { useWindowSize } from '../utils/utils';

interface VideosSidebarProps {
  disciplines: Disciplines;
  viewState: ReturnType<
    typeof useState<{
      discipline: keyof Disciplines;
      pattern: string;
    }>
  >;
}

export default function VideosSidebar({
  disciplines,
  viewState,
}: VideosSidebarProps) {
  const [view, setView] = viewState;
  const [activeSubMenu, openSubMenu] = useState(undefined);
  const [width] = useWindowSize();

  const submenus: Pick<SubMenuProps, 'label' | 'icon' | 'patterns'>[] = [
    {
      label: 'Entrances',
      icon: <p>E</p>,
      patterns: disciplines[view.discipline].patterns.entrances,
    },
    {
      label: 'Snakes',
      icon: <p>S</p>,
      patterns: disciplines[view.discipline].patterns.snakes,
    },
    {
      label: 'Verticals',
      icon: <p>V</p>,
      patterns: disciplines[view.discipline].patterns.verticals,
    },
    {
      label: 'Mixers',
      icon: <p>M</p>,
      patterns: disciplines[view.discipline].patterns.mixers,
    },
    {
      label: 'Exits',
      icon: <p>E</p>,
      patterns: disciplines[view.discipline].patterns.exits,
    },
  ];

  return (
    <Sidebar defaultCollapsed={width < 800}>
      <Menu>
        {submenus.map(({ label, icon, patterns }) => (
          <CustomSubMenu
            key={label}
            label={label}
            icon={icon}
            patterns={patterns}
            open={activeSubMenu === label}
            onSubMenuOpen={openSubMenu}
            onPatternClick={(pattern) =>
              setView({ discipline: view.discipline, pattern })
            }
          />
        ))}
      </Menu>
    </Sidebar>
  );
}

interface SubMenuProps {
  label: string;
  icon: JSX.Element;
  patterns: Record<string, Pattern>;
  open: boolean;
  onSubMenuOpen: (label: string) => void;
  onPatternClick: (pattern: string) => void;
}

function CustomSubMenu(props: SubMenuProps) {
  const [open, setOpen] = useState(props.open);

  return (
    <SubMenu
      label={props.label}
      icon={props.icon}
      open={props.open}
      onOpenChange={() => props.onSubMenuOpen(props.label)}
    >
      {Object.entries(props.patterns || {}).map(([key, pattern]) => (
        <MenuItem key={key} onClick={() => props.onPatternClick(key)}>
          {key} - {pattern.name}
        </MenuItem>
      ))}
    </SubMenu>
  );
}
