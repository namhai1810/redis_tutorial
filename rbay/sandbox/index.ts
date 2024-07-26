import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
    // if exits => delete else wrong type
    await client.del('car');
    // after save to redis, node redis convert them to string
    // {cylinders: 4} => '{"cylinders":4}' (String object)
    // null and undefined cannot converted to string
    // await client.hSet('car', {
    //     color: 'red',
    //     year: 2020,
    //     engine: {cylinders: 4},
    //     owner: null || '',
    //     service: undefined || '',
    // })
    // // HSET car color red year 2020
    // const car = await client.hGetAll('car#fdfdsf');
    // if (Object.keys(car).length === 0){
    //     console.log('Car not found');
    //     return;
    // }
    // console.log(car);

    // We can crreate pipleline to execute multiple commands
    // Node redis can be different
    // Run all this cmd at the same time
    // const result = await Promise.all([
    //     client.hSet('car', 'color', 'red'),
    //     client.hSet('car', 'year', 2020),
    //     client.hSet('car', 'engine', JSON.stringify({cylinders: 4})),
    //     client.hSet('car', 'owner', ''),
    //     client.hSet('car', 'service', ''),
    // ]);
    await client.hSet('car1', {
        color: 'red',
        year: 2020,
    });
    await client.hSet('car2', {
        color: 'blue',
        year: 2021,
    });
    await client.hSet('car3', {
        color: 'green',
        year: 2022,
    });
    const commands = [1,2,3].map(i => {
        return client.hGetAll(`car${i}`);
    });
    const result = await Promise.all(commands);
    console.log(result)
};
run();
