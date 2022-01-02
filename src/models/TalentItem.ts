export default class TalentItem {
/* 
  {
    "name": "Zealous Fire",
    "tier": "5",
    "activation": "Passive",
    "ranked": "No",
    "description": [
      "Each time your Game Master spends a Story Point, your character heals 2 strain."
    ],
    "source": "RoT p. 91"
  }
*/
  key: number = 0;
  name: string = '';
  tier: string = '';
  activation: string = '';
  ranked: string = '';
  description: string[] = [];
  source: string = '';

}