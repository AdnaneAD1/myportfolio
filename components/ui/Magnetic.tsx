'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Magnetic({ children, strength = 0.5 }: { children: React.ReactElement, strength?: number }) {
    const magnetic = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!magnetic.current) return;
        
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = magnetic.current!.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * strength;
            const y = (clientY - (top + height / 2)) * strength;
            xTo(x);
            yTo(y);
        }

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        }

        magnetic.current.addEventListener("mousemove", handleMouseMove)
        magnetic.current.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            if (magnetic.current) {
                magnetic.current.removeEventListener("mousemove", handleMouseMove)
                magnetic.current.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, { scope: magnetic });

    return React.cloneElement(children, { ref: magnetic } as React.RefAttributes<HTMLElement>);
}
