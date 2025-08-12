import React, { useState, useEffect, useRef } from 'react';
import { Text, Flex } from '@fluentui/react-northstar';
import type { TopNavItem } from '../types/menu';
import './MegaMenu.css';

interface MegaMenuProps {
    topNavItems: TopNavItem[];
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ topNavItems }) => {
    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const handleMenuItemHover = (itemId: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveMenuItem(itemId);
        setSelectedCategory(null);
    };

    const handleMenuItemLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenuItem(null);
            setSelectedCategory(null);
        }, 200);
    };

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    };

    const handleMegaMenuMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleMegaMenuMouseLeave = () => {
        setActiveMenuItem(null);
        setSelectedCategory(null);
    };

    const handleItemClick = (url?: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
        setActiveMenuItem(null);
        setSelectedCategory(null);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const activeItem = topNavItems.find(item => item.id === activeMenuItem);

    return (
        <div className="mega-menu-container" ref={menuRef}>
            {/* Top Navigation Bar */}
            <Flex className="top-nav-bar">
                <div className="hamburger-menu">
                    <Text content="☰" size="large" />
                </div>

                {topNavItems.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeMenuItem === item.id ? 'active' : ''}`}
                        onMouseEnter={() => handleMenuItemHover(item.id)}
                        onMouseLeave={handleMenuItemLeave}
                    >
                        <Text content={item.label} weight="semibold" />
                    </div>
                ))}

                <div className="more-menu">
                    <Text content="⋯" size="large" />
                </div>
            </Flex>

            {/* Mega Menu Dropdown */}
            {activeMenuItem && activeItem && activeItem.categories.length > 0 && (
                <div
                    className="mega-menu-dropdown"
                    onMouseEnter={handleMegaMenuMouseEnter}
                    onMouseLeave={handleMegaMenuMouseLeave}
                >
                    <Flex gap="gap.medium">
                        {/* Left Sidebar with Categories */}
                        <div className="categories-sidebar">
                            {activeItem.categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(category.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Text content={category.title} size="medium" />
                                </div>
                            ))}
                        </div>

                        {/* Right Content Area */}
                        <div className="menu-content">
                            {selectedCategory ? (
                                /* Show items for the selected category */
                                (() => {
                                    const selectedCategoryData = activeItem.categories.find(cat => cat.id === selectedCategory);
                                    return selectedCategoryData ? (
                                        <div className="category-column">
                                            <Text content={selectedCategoryData.title} size="medium" weight="bold" />
                                            <div className="category-items">
                                                {selectedCategoryData.items.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        className="menu-item clickable"
                                                        onClick={() => handleItemClick(item.url)}
                                                        type="button"
                                                    >
                                                        <Text content={item.label} size="small" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null;
                                })()
                            ) : (
                                /* Show all categories as columns when no specific category is hovered */
                                <Flex gap="gap.small" wrap>
                                    {activeItem.categories.map((category) => (
                                        <div key={category.id} className="category-column">
                                            <Text content={category.title} size="medium" weight="bold" />
                                            <div className="category-items">
                                                {category.items.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        className="menu-item clickable"
                                                        onClick={() => handleItemClick(item.url)}
                                                        type="button"
                                                    >
                                                        <Text content={item.label} size="small" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </Flex>
                            )}
                        </div>
                    </Flex>
                </div>
            )}
        </div>
    );
};
