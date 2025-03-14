import React, { useState, useEffect, useRef } from 'react';
import { Layout, Typography, Button } from 'antd';
import { useNavigation } from '@/hooks/useNavigation';

const { Title } = Typography;

const GRID_SIZE = 20;
const GAME_SPEED = 150;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const Game3 = () => {
    const { goBack } = useNavigation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>({ x: 15, y: 15 });
    const directionRef = useRef<Direction>('RIGHT');

    // 生成随机食物
    const generateFood = () => ({
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30)
    });

    // 游戏逻辑
    useEffect(() => {
        const moveSnake = () => {
            if (gameOver) return;

            const newSnake = [...snake];
            const head = { ...newSnake[0] };

            switch (directionRef.current) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // 碰撞检测
            if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 ||
                newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                return;
            }

            newSnake.unshift(head);

            // 吃食物逻辑
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        const gameLoop = setInterval(moveSnake, GAME_SPEED);
        return () => clearInterval(gameLoop);
    }, [snake, food, gameOver]);

    // 键盘控制
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const newDirection = {
                ArrowUp: 'UP',
                ArrowDown: 'DOWN',
                ArrowLeft: 'LEFT',
                ArrowRight: 'RIGHT'
            }[e.key] as Direction;

            if (newDirection) {
                const opposite = {
                    UP: 'DOWN',
                    DOWN: 'UP',
                    LEFT: 'RIGHT',
                    RIGHT: 'LEFT'
                }[directionRef.current];

                if (newDirection !== opposite) {
                    directionRef.current = newDirection;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // 绘制画布
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制食物
        ctx.fillStyle = '#ff4d4f';
        ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);

        // 绘制蛇
        ctx.fillStyle = '#1890ff';
        snake.forEach((pos, index) => {
            ctx.fillRect(
                pos.x * GRID_SIZE,
                pos.y * GRID_SIZE,
                GRID_SIZE - 2,
                GRID_SIZE - 2
            );
        });
    }, [snake, food]);

    return (
        <div style={{
            maxWidth: 600,
            margin: '40px auto',
            textAlign: 'center'
        }}>
            <Button onClick={goBack} style={{ marginBottom: 24 }}>返回</Button>
            <Title level={2} style={{ marginBottom: 24 }}>
                贪吃蛇游戏 🐍 得分: {score}
            </Title>

            <canvas
                ref={canvasRef}
                width={600}
                height={600}
                style={{
                    border: '2px solid #1890ff',
                    borderRadius: 8,
                    backgroundColor: '#fafafa'
                }}
            />

            {gameOver && (
                <div style={{ marginTop: 24 }}>
                    <Title level={3} style={{ color: '#ff4d4f' }}>游戏结束!</Title>
                    <Button
                        type="primary"
                        onClick={() => {
                            setSnake([{ x: 10, y: 10 }]);
                            setScore(0);
                            setGameOver(false);
                            directionRef.current = 'RIGHT';
                        }}
                    >
                        重新开始
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Game3;