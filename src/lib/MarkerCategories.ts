import { Car, Leaf, LocateFixed, LucideProps } from 'lucide-react'
import { FunctionComponent } from 'react'
import colors from 'tailwindcss/colors'

export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
}

export interface MarkerCategoriesValues {
  name: string
  icon: FunctionComponent<LucideProps>
  color: string
}

type MarkerCategorieType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategorieType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: LocateFixed,
    color: colors.green[400],
  },
  [Category.CAT1]: {
    name: 'Category 1',
    icon: Leaf,
    color: colors.blue[400],
  },
  [Category.CAT2]: {
    name: 'Category 2',
    icon: Car,
    color: colors.red[400],
  },
}

export default MarkerCategories
