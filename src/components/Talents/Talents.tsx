import talentsData from '../../data/talents.json';
import { Space, AutoComplete, Input, Checkbox, Form, Typography, Divider } from 'antd';
import { useEffect, useState } from 'react';
import TalentItem from '../../models/TalentItem';
import Talent from '../Talent/Talent';
const { Title } = Typography;

/* EXAMPLE TALENT DATA 
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

let dataCache: TalentItem[] | null = null;

function getData<TalentItem>() {
  let increment = 0;
  if (dataCache === null) {
    dataCache = talentsData.map(item => {
      return {...item, key: increment++};
    });
  }
  return dataCache;
};

const columns = [
  { title: 'Tier', dataIndex: 'tier', key: 'tier', sorter: (a: { tier: string; }, b: { tier: string; }) => a.tier.localeCompare(b.tier) },
  { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name) },
  { title: 'Activation', dataIndex: 'activation', key: 'activation', sorter: (a: { activation: string; }, b: { activation: string; }) => a.activation.localeCompare(b.activation) },
  { title: 'Ranked', dataIndex: 'ranked', key: 'ranked', sorter: (a: { ranked: string; }, b: { ranked: string; }) => a.ranked.localeCompare(b.ranked) },
  { title: 'Source', dataIndex: 'source', key: 'source', sorter: (a: { source: string; }, b: { source: string; }) => a.source.localeCompare(b.source) },
];


function Talents(): JSX.Element {
  const options = getData().map(item => { return {value: item.name}; });
  let tierOptions = [...new Set<string>(getData().map(item => item.tier))];
  const [data, setData] = useState(getData());
  const [tiers, setTiers] = useState(tierOptions);
  useEffect(() => { filterResults(); }, [tiers]);
  
  const [search, setSearchTerm] = useState('');
  useEffect(() => { filterResults(); }, [search]);

  const filterResults = () => {
    let filteredData = getData().filter((item) => {
      if (!item.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (!tiers.includes(item.tier)) {
        return false;
      }

      return true;
    });
    setData(filteredData);
  };


  const onSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const onTierChange = (e: any[]) => {
    setTiers(e);
  }

  const talentsList = data.map((talent) => 
    <Talent talent={talent} key={talent.key}/>  
  );

  return (
    <>
    <Space direction='vertical' >
      <Title>Talents</Title>
      <div>
          <AutoComplete 
          options={options}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }>
            <Input.Search size="large" onSearch={onSearch} />
          </AutoComplete>
      </div>
      <div>
        <Form.Item label="Include Tiers">
          <Checkbox.Group options={tierOptions} defaultValue={tierOptions} onChange={onTierChange}/>
        </Form.Item>
      </div>
    </Space>
  
    {talentsList}

    </>
  );
}

export default Talents;