import talentsData from './talents.json';
import { List, Table, Space, Descriptions, AutoComplete, Input, Checkbox, Form, Divider, Typography } from 'antd';
import { ReactChild, ReactFragment, ReactPortal, SetStateAction, useEffect, useState } from 'react';
import TalentItem from './TalentItem';
import Talent from './Talent';
const { Title } = Typography;
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

let dataCache: { key: number; name: string; tier: string; activation: string; ranked: string; description: string[]; source: string; }[] | null = null;

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

function description(record: { name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; tier: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; activation: {} | null | undefined; ranked: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; source: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; description: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) {
  return (   
    <Descriptions title={record.name} >
        <Descriptions.Item label="Description">{record.description}</Descriptions.Item>
      </Descriptions>
  );
}





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
      <Talent talent={talent} />
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
  
    {/* <Table
      columns={columns}
      expandable={{
        expandedRowRender: description,
        rowExpandable: record => record.name !== 'Not Expandable',         
      }}
      dataSource={data}
    /> */}

    {talentsList}

    </>
  );
}

export default Talents;