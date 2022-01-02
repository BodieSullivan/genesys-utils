import { Divider, Space, Tag, Typography } from "antd";
import './Talent.css';
import TalentItem from "../../models/TalentItem";
const { Paragraph } = Typography;

function Talent(props: {talent: TalentItem}): JSX.Element {

    return (
    <div className={"talent-item"}>     
      <Space direction='vertical' >
        <h2>{props.talent.name}</h2>
        <div>
          <Tag>Tier: {props.talent.tier}</Tag>
          <Tag>{props.talent.activation}</Tag>
          {props.talent.ranked === 'Yes' ? <Tag>Ranked</Tag> : ''}
          <Tag>Source: {props.talent.source}</Tag>
        </div>        
        <Paragraph copyable>{props.talent.description}</Paragraph>
      </Space>       
    </div>);

}

export default Talent;
