export enum ComBoxOptionsEnum {
  Option1 = 'Option1',
  Option2 = 'Option2',
  Option3 = 'Option3',
  Option4 = 'Option4',
  Option5 = 'Option5',
}

import { ComBoxOptions } from './components/ComboBox/ComboBox';

export const comboBoxOptions: ComBoxOptions<ComBoxOptionsEnum> = [
  { label: 'Option1', value: ComBoxOptionsEnum.Option1 },
  { label: 'Option2', value: ComBoxOptionsEnum.Option2 },
  { label: 'Option3', value: ComBoxOptionsEnum.Option3 },
  { label: 'Option4', value: ComBoxOptionsEnum.Option4 },
  { label: 'Option5', value: ComBoxOptionsEnum.Option5 },
];
