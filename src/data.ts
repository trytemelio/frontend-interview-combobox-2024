export function filterItems(items: DropdownDataList, query: string): DropdownDataList {
  return items.filter((item) => item.label.includes(query));
}

export interface DropdownData {
  label: string;
  value: string;
}

export type DropdownDataList = DropdownData[];

export const dropdownData: DropdownDataList = [
  {
    label: 'Option 1',
    value: 'option1'
  },
  {
    label: 'Option 2',
    value: 'option2'
  },
  {
    label: 'Option 3',
    value: 'option3'
  },
  {
    label: 'Option 12',
    value: 'option12'
  }
];
