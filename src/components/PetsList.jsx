import { List, Button, Tag } from "antd";

export const PetsList = ({ petsList, handleAdoption }) => {
  return (
    <>
      <List
        itemLayout="vertical"
        size="small"
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   pageSize: 3,
        // }}
        dataSource={petsList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[<Button disabled={item.isAdopted} onClick={()=> handleAdoption(item.id) }>Adopt</Button>]}
            extra={<img width={272} alt={`${item.name}`} src={item.photo} />}
          >
            <List.Item.Meta title={<span>{item.name}</span>} />
            <>
              Status:
              {item.isAdopted ? (
                <Tag color="magenta">Adopted</Tag>
              ) : (
                <Tag color="green">Available</Tag>
              )}
              <ul>
                <li>Location: {item.location}</li>
                <li>race: {item.race}</li>
                <li>type: {item.type}</li>
              </ul>
            </>
          </List.Item>
        )}
      />
    </>
  );
};
