import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Statistic, Space } from 'antd';

const cardSymbols = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎫', '🎰'];
const cardBack = '❓';

const MemoryCardGame = () => {
    const [cards, setCards] = useState<string[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    // 初始化游戏
    useEffect(() => {
        initializeGame();
    }, []);

    // 生成卡片
    const initializeGame = () => {
        const duplicated = [...cardSymbols, ...cardSymbols];
        const shuffled = duplicated.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlippedIndices([]);
        setMatchedPairs([]);
        setMoves(0);
        setTime(0);
        setGameStarted(false);
    };

    // 处理卡片点击
    const handleCardClick = (index: number) => {
        if (!gameStarted) setGameStarted(true);
        if (flippedIndices.length === 2 || flippedIndices.includes(index)) return;

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
                setMatchedPairs([...matchedPairs, ...newFlipped]);
            }
            setTimeout(() => setFlippedIndices([]), 1000);
        }
    };

    // 计时器
    useEffect(() => {
        const timer = gameStarted && matchedPairs.length < cards.length
            ? setInterval(() => setTime(t => t + 1), 1000)
            : undefined;
        return () => clearInterval(timer);
    }, [gameStarted, matchedPairs, cards.length]);

    return (
        <div style={{ maxWidth: 800, margin: '20px auto' }}>
            <Space style={{ marginBottom: 20 }}>
                <Statistic title="时间 (秒)" value={time} />
                <Statistic title="移动次数" value={moves} />
                <Button onClick={initializeGame}>重新开始</Button>
            </Space>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                padding: 16,
            }}>
                {cards.map((card, index) => {
                    const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(index);
                    return (
                        <motion.div
                            key={index}
                            onClick={() => handleCardClick(index)}
                            style={{
                                aspectRatio: 1,
                                perspective: 1000,
                                cursor: 'pointer',
                            }}
                        >
                            <motion.div
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 40,
                                        backgroundColor: '#fff',
                                        borderRadius: 8,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    {cardBack}
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 40,
                                        backgroundColor: '#fff',
                                        borderRadius: 8,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    {card}
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {matchedPairs.length === cards.length && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <h2>🎉 恭喜！用时 {time} 秒，移动 {moves} 次</h2>
                </div>
            )}
        </div>
    );
};

export default MemoryCardGame;