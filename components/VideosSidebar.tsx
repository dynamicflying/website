import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
} from 'react-pro-sidebar';
import { customColors } from '../utils/theme';
import { Disciplines, Pattern } from '../utils/types';
import { useWindowSize } from '../utils/utils';

interface VideosSidebarProps {
  disciplines: Disciplines;
  view: {
    discipline: string;
    pattern: string;
    video: number;
  };
}

export default function VideosSidebar({
  disciplines,
  view,
}: VideosSidebarProps) {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [activeSubMenu, openSubMenu] = useState(undefined);
  const [width] = useWindowSize();

  const router = useRouter();

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
            label={`Discipline: ${router.query.discipline}`}
            icon={<p>D</p>}
            open={selectorOpen}
            onOpenChange={(open) => setSelectorOpen(open)}
          >
            {disciplines.map((discipline) => (
              <MenuItem
                key={discipline.id}
                active={view.discipline == discipline.id}
                onClick={() => {
                  router.push(`/videos/${discipline.id}/choose`);
                  setSelectorOpen(false);
                }}
              >
                {discipline.id}
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
        <div className="m-10"></div>
        <Menu closeOnClick menuItemStyles={menuItemsStyles}>
          {disciplines
            .find((d) => d.id == view.discipline)
            ?.pattern_types.map((type) => {
              const label = type.name,
                icon = <p>{label[0].toUpperCase()}</p>;

              return (
                <CustomSubMenu
                  key={label}
                  label={label}
                  icon={icon}
                  patterns={type.patterns}
                  open={activeSubMenu === label}
                  onSubMenuOpen={openSubMenu}
                  currentPattern={view.pattern}
                  type={type.name}
                  onPatternClick={(pattern) =>
                    router.push(`/videos/${view.discipline}/${pattern}`)
                  }
                />
              );
            })}
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
  patterns: Pattern[];
  type: string;
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
      {(props.patterns || []).map((pattern) => (
        <MenuItem
          key={pattern.id}
          active={props.currentPattern == pattern.id}
          onClick={() => props.onPatternClick(pattern.id)}
        >
          {pattern.id} - {pattern.name}
        </MenuItem>
      ))}
    </SubMenu>
  );
}
