export const serializeDelivery = (data = {}) => ({
  deliveryMinCost: data.delivery_min_cost,
  deliveryMaxCost: data.delivery_max_cost,
  lowLimitMinutes: data.low_limit_minutes,
  upperLimitMinutes: data.upper_limit_minutes,
});

export const deserializeDelivery = (data = {}) => ({
  delivery_min_cost: data.deliveryMinCost,
  delivery_max_cost: data.deliveryMaxCost,
  low_limit_minutes: data.lowLimitMinutes,
  upper_limit_minutes: data.upperLimitMinutes,
});

export const serializeRestaurant = (data = {}) => ({
  id: data.id,
  title: data.title,
  state: data.state,
  image: data.image,
  rating: (100 / data.rating)?.toFixed(1) || 0,
  willBeDeliveredBy: (data.will_be_delivered_by || '').toLowerCase(),
  cityId: data.city_id,
  stateWeight: data.state_weight,
});


export const deserializeRestaurant = (data = {}) => ({
  id: data.id,
  title: data.title,
  state: data.state,
  image: data.image,
  rating: data.rating,
  will_be_delivered_by: data.willBeDeliveredBy,
  city_id: data.cityId,
  state_weight: data.stateWeight,
});

export const serializeRestaurantMain = (restaurant = {}) => ({
  isTopRestaurant: restaurant.is_top_restaurant,
  delivery: serializeDelivery(restaurant.delivery),
  restaurant: serializeRestaurant(restaurant.restaurant),
})

export const serializeRestaurantsMainList = (list = []) => list.map(serializeRestaurantMain);
