import { getUniqueKey } from '../utils'

export const defaultTiers = ['S', 'A', 'B', 'C', 'D']

export const tierItems = [
  {
    id: getUniqueKey(),
    tier: defaultTiers[0],
    imageUrl:
      'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/965cad30-9cd2-4aaa-9cc6-07e8517ca88fpng.png',
  },
  {
    id: getUniqueKey(),
    tier: defaultTiers[0],
    imageUrl:
      'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/caad75b5-51df-4110-aeb7-ae4eb84c5571png.png',
  },
  {
    id: getUniqueKey(),
    tier: defaultTiers[0],
    imageUrl:
      'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/5d13af71-a7a9-404d-8f63-0f16a4210545png.png',
  },
  {
    id: getUniqueKey(),
    tier: defaultTiers[0],
    imageUrl:
      'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/e041bc80-4879-42c8-a886-642427adf7bepng.png',
  },
]
