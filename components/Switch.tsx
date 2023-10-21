import * as RadixSwitch from '@radix-ui/react-switch';

export interface SwitchProps {
  disabled?: boolean
  checked?: boolean
  label?: string
  onCheckedChange?: (checked: boolean) => void
}

export default function Switch({ checked, disabled, label, onCheckedChange }: SwitchProps) {
  return (<div style={{ display: 'flex', alignItems: 'center' }}>
    <label className={"Label " + (disabled ? 'opacity-70' : '')} htmlFor="airplane-mode" style={{ paddingRight: 15 }}>
      {label}
    </label>
    <RadixSwitch.Root
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      className="SwitchRoot"
      id="airplane-mode"
    >
      <RadixSwitch.Thumb className="SwitchThumb" />
    </RadixSwitch.Root>
  </div>)
}
