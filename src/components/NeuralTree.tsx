'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function NeuralTree() {


    // Generate tree paths and nodes
    const { trunk, canopyPaths, nodes, trunkTip } = useMemo(() => {
        const cPaths: { d: string; color: string; width: number; delay: number; duration: number }[] = [];
        const n: { x: number; y: number; color: string; size: number; delay: number }[] = [];
        let tPath: any = null;
        let tTip = { x: 0, y: 0 };

        // Recursive function to generate branches
        const generateBranch = (
            x: number,
            y: number,
            angle: number,
            length: number,
            depth: number,
            startTime: number
        ) => {
            // Updated animation speed: faster base and tighter increment
            const duration = 0.3 + depth * 0.05;
            const endTime = startTime + duration * 0.8; // Overlap animations slightly

            const x2 = x + length * Math.cos(angle * Math.PI / 180);
            const y2 = y - length * Math.sin(angle * Math.PI / 180);

            // More organic curve control points
            const cx = (x + x2) / 2 + (Math.random() - 0.5) * length * 0.4;
            const cy = (y + y2) / 2 + (Math.random() - 0.5) * length * 0.2;

            const pathData = {
                d: `M${x} ${y} Q${cx} ${cy} ${x2} ${y2}`,
                color: depth % 2 === 0 ? '#0b182f' : '#415b3e',
                width: Math.max(0.5, depth * 0.8),
                delay: startTime,
                duration: duration
            };

            // Store paths
            if (depth === 6) {
                tPath = pathData;
                tTip = { x: x2, y: y2 };
            } else {
                cPaths.push(pathData);
            }

            // Guarantee a leaf at every "node" (joint), except the very base
            if (depth !== 6) {
                n.push({
                    x: x2, y: y2,
                    color: Math.random() > 0.6 ? '#415b3e' : '#0b182f', // Mix colors
                    size: 3 + Math.random() * 3,
                    delay: endTime // Appear as branch finishes
                });
            }

            // Recursive step
            if (depth > 0) {
                // REVERTED: Back to original 2 branches for structured canopy
                const numBranches = 2;
                const branchAngleSpan = 50 + Math.random() * 30;

                for (let i = 0; i < numBranches; i++) {
                    // REVERTED: Original symmetric angle calculation
                    const newAngle = angle - branchAngleSpan / 2 + (branchAngleSpan / (numBranches - 1)) * i + (Math.random() - 0.5) * 15;
                    // REVERTED: Original length scaling
                    const newLength = length * 0.75;

                    generateBranch(x2, y2, newAngle, newLength, depth - 1, endTime);
                }
            }
        };

        generateBranch(1100, 900, 100, 180, 6, 0);

        return { trunk: tPath, canopyPaths: cPaths, nodes: n, trunkTip: tTip };
    }, []);

    return (
        <div className="w-full h-full absolute inset-0 overflow-hidden">
            <svg
                className="w-full h-full"
                viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Static Trunk */}
                {trunk && (
                    <motion.path
                        d={trunk.d}
                        fill="none"
                        stroke={trunk.color}
                        strokeWidth={trunk.width}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{
                            duration: trunk.duration,
                            delay: trunk.delay,
                            ease: "linear"
                        }}
                    />
                )}

                {/* Static Canopy */}
                {/* Branches */}
                {canopyPaths.map((path, i) => (
                    <motion.path
                        key={`path-${i}`}
                        d={path.d}
                        fill="none"
                        stroke={path.color}
                        strokeWidth={path.width}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{
                            duration: path.duration,
                            delay: path.delay,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <motion.circle
                        key={`node-${i}`}
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill={node.color}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            scale: {
                                repeat: Infinity,
                                duration: 2 + Math.random() * 2,
                                ease: "easeInOut"
                            },
                            opacity: {
                                repeat: Infinity,
                                duration: 2 + Math.random() * 2,
                                ease: "easeInOut",
                                delay: Math.random()
                            },
                            default: { delay: node.delay, duration: 0.2 }
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
