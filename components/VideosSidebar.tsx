import { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
} from 'react-pro-sidebar';
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
  const [selectorOpen, setSelectorOpen] = useState(false);
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

  const menuItemsStyles: MenuItemStyles = {
    button: ({ level, active, disabled }) => {
      return {
        color: active ? '#fff' : '#9da5b4',
        backgroundColor: active ? '#314361' : '#1e293b',
        ':hover': {
          color: '#fff',
          backgroundColor: '#445d87',
        },
      };
    },
  };

  return (
    <div className="flex pt-10 border-r-solid border-r-2 border-r-slate-600">
      <Sidebar
        defaultCollapsed={width < 800}
        backgroundColor="#1e293b"
        rootStyles={{ borderWidth: 0 }}
      >
        <Menu closeOnClick menuItemStyles={menuItemsStyles}>
          <SubMenu
            label={`Discipline: ${view.discipline}`}
            icon={<p>D</p>}
            open={selectorOpen}
            onOpenChange={(open) => setSelectorOpen(open)}
          >
            {Object.keys(disciplines).map((discipline: keyof Disciplines) => (
              <MenuItem
                key={discipline}
                active={view.discipline == discipline}
                onClick={() => {
                  setView({ discipline, pattern: '' });
                  setSelectorOpen(false);
                }}
              >
                {discipline}
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
        <div className="m-10"></div>
        <Menu closeOnClick menuItemStyles={menuItemsStyles}>
          {submenus.map(({ label, icon, patterns }) => (
            <CustomSubMenu
              key={label}
              label={label}
              icon={icon}
              patterns={patterns}
              open={activeSubMenu === label}
              onSubMenuOpen={openSubMenu}
              currentPattern={view.pattern}
              onPatternClick={(pattern) =>
                setView({ discipline: view.discipline, pattern })
              }
            />
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}

interface SubMenuProps {
  label: string;
  icon: JSX.Element;
  patterns: Record<string, Pattern>;
  open: boolean;
  onSubMenuOpen: (label: string) => void;
  currentPattern: string;
  onPatternClick: (pattern: string) => void;
}

function CustomSubMenu(props: SubMenuProps) {
  return (
    <SubMenu
      label={props.label}
      icon={props.icon}
      open={props.open}
      onOpenChange={(open) => props.onSubMenuOpen(open ? props.label : null)}
    >
      {Object.entries(props.patterns || {}).map(([key, pattern]) => (
        <MenuItem
          key={key}
          active={props.currentPattern == key}
          onClick={() => props.onPatternClick(key)}
        >
          {key} - {pattern.name}
        </MenuItem>
      ))}
    </SubMenu>
  );
}
