import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;

const RestaurantCard = ({restaurant, handleDetailClick}) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={restaurant.name} src={restaurant.image_url} />}
      onClick={() => handleDetailClick(restaurant.id)}
    >
      <Meta title={restaurant.name} description={`地点：${restaurant.location}，价格：${restaurant.price}`} />
      <Button type="link">查看详情</Button>
    </Card>
  );
};

export default RestaurantCard;
