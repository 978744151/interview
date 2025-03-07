import React, { useState } from 'react';
import { Input, Button, Card, Space, Tag, List, Alert, Descriptions } from 'antd';

const Game1: React.FC = () => {
    const [target, setTarget] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [guesses, setGuesses] = useState<number[]>([]);
    const [gameStatus, setGameStatus] = useState('playing');

    const handleGuess = () => {
        const num = parseInt(guess);
        if (isNaN(num) || num < 1 || num > 100) return;

        setGuesses([...guesses, num]);

        if (num === target) {
            setGameStatus('won');
            setTimeout(() => setGuess(''), 1500);
        } else {
            setGuess('');
        }
    };

    const resetGame = () => {
        setTarget(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setGuesses([]);
        setGameStatus('playing');
    };

    const getHint = () => {
        if (guesses.length === 0) return '输入1-100之间的数字开始游戏';
        const lastGuess = guesses[guesses.length - 1];
        return lastGuess > target ? '太大了！' : '太小了！';
    };

    return (
        <Card
            title="数字猜谜游戏"
            style={{ maxWidth: 600, margin: '20px auto' }}
            extra={<Button onClick={resetGame}>重新开始</Button>}
        >
            <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="游戏规则">
                    1. 系统随机生成1-100的数字<br />
                    2. 输入你的猜测数字<br />
                    3. 根据提示调整猜测<br />
                    4. 在最少次数内猜中！
                </Descriptions.Item>
            </Descriptions>

            <Space style={{ margin: '20px 0' }}>
                <Input
                    type="number"
                    min={1}
                    max={100}
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onPressEnter={handleGuess}
                    disabled={gameStatus === 'won'}
                    style={{ width: 120 }}
                    placeholder="输入1-100"
                    autoFocus
                />
                <Button
                    type="primary"
                    onClick={handleGuess}
                    disabled={gameStatus === 'won'}
                >
                    猜！
                </Button>
            </Space>

            {gameStatus === 'won' && (
                <Alert
                    message={`恭喜！您在${guesses.length}次猜中数字 ${target}`}
                    type="success"
                    showIcon
                    style={{ marginBottom: 20 }}
                />
            )}

            <List
                header={<div>猜测历史（次数: {guesses.length}）</div>}
                dataSource={guesses}
                renderItem={(item, index) => (
                    <List.Item>
                        <Tag color={item === target ? 'green' : 'blue'}>
                            第{index + 1}次: {item}
                            {item > target ? ' → 太大' : ' → 太小'}
                        </Tag>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default Game1;