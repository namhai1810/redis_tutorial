import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
    // if exits => delete else wrong type
    await client.del('car');
    // after save to redis, node redis convert them to string
    // {cylinders: 4} => '{"cylinders":4}' (String object)
    // null and undefined cannot converted to string
    await client.hSet('car', {
        color: 'red',
        year: 2020,
        engine: {cylinders: 4},
        owner: null || '',
        service: undefined || '',
    })
    // HSET car color red year 2020
    const car = await client.hGetAll('car#fdfdsf');
    if (Object.keys(car).length === 0){
        console.log('Car not found');
        return;
    }
    console.log(car);
};
run();
