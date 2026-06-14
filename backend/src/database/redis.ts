import Redis from 'ioredis';

export const redis = new Redis({
	host: process.env.REDIS_HOST || 'localhost',
	port: parseInt(process.env.REDIS_PORT || '6379', 10),
	password: process.env.REDIS_PASSWORD || 'password123',
})

redis.on('connect', () => process.env.NODE_ENV === 'development' && console.log('✅ Databaza ulandi'))
redis.on('error', (err) => console.error('❌ Redis error:', err))