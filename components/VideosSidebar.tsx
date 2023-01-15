import { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
} from 'react-pro-sidebar';
import { customColors } from '../utils/theme';
import { Disciplines, Pattern, Patterns } from '../utils/types';
import { useWindowSize } from '../utils/utils';

interface VideosSidebarProps {
  disciplines: Disciplines;
  viewState: ReturnType<
    typeof useState<{
      discipline: keyof Disciplines;
      category: keyof Patterns;
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

  const submenus: Pick<SubMenuProps, 'label' | 'icon' | 'category'>[] = [
    {
      label: 'Entrances',
      icon: <p>E</p>,
      category: 'entrances',
    },
    {
      label: 'Snakes',
      icon: <p>S</p>,
      category: 'snakes',
    },
    {
      label: 'Verticals',
      icon: <p>V</p>,
      category: 'verticals',
    },
    {
      label: 'Mixers',
      icon: <p>M</p>,
      category: 'mixers',
    },
    {
      label: 'Exits',
      icon: <p>E</p>,
      category: 'exits',
    },
  ];

  const menuItemsStyles: MenuItemStyles = {
    button: ({ level, active, disabled }) => {
      return {
        color: active ? customColors.textBright : customColors.text,
        backgroundColor: active ? customColors.bgActive : customColors.bg,
        ':hover': {
          color: customColors.textBright,
          backgroundColor: customColors.bgHover,
        },
      };
    },
  };

  return (
    <div className="flex pt-10 border-r-solid border-r-2 border-r-slate-600">
      <Sidebar
        defaultCollapsed={width < 800}
        backgroundColor={customColors.bg}
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
                  setView({ discipline, category: null, pattern: null });
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
          {submenus.map(({ label, icon, category }) => (
            <CustomSubMenu
              key={label}
              label={label}
              icon={icon}
              patterns={disciplines[view.discipline].patterns[category]}
              open={activeSubMenu === label}
              onSubMenuOpen={openSubMenu}
              currentPattern={view.pattern}
              category={category}
              onPatternClick={(category, pattern) =>
                setView({ discipline: view.discipline, category, pattern })
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
  open: boolean;
  onSubMenuOpen: (label: string) => void;
  currentPattern: string;
  patterns: Patterns[keyof Patterns];
  category: keyof Patterns;
  onPatternClick: (category: keyof Patterns, pattern: string) => void;
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
          onClick={() => props.onPatternClick(props.category, key)}
        >
          {key} - {pattern.name}
        </MenuItem>
      ))}
    </SubMenu>
  );
}
