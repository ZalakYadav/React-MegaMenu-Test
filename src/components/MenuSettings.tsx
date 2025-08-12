import React, { useState, useEffect } from 'react';
import {
    Button,
    Flex,
    Text,
    Input,
    FormField
} from '@fluentui/react-northstar';
import type { MegaMenuData, TopNavItem, MenuCategory, MenuSubItem } from '../types/menu';
import './MenuSettings.css';

interface MenuSettingsProps {
    menuData: MegaMenuData;
    onSave: (menuData: MegaMenuData) => void;
    onReset: () => void;
}

export const MenuSettings: React.FC<MenuSettingsProps> = ({ menuData, onSave, onReset }) => {
    const [editData, setEditData] = useState<MegaMenuData>(JSON.parse(JSON.stringify(menuData)));
    const [selectedTopNavIndex, setSelectedTopNavIndex] = useState<number>(0);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

    useEffect(() => {
        setEditData(JSON.parse(JSON.stringify(menuData)));
        setSelectedTopNavIndex(0);
        setSelectedCategoryIndex(0);
    }, [menuData]);

    const safeTopNavIndex = Math.min(selectedTopNavIndex, editData.topNavItems.length - 1);
    const selectedTopNav = editData.topNavItems[safeTopNavIndex];

    const safeCategoryIndex = selectedTopNav && selectedTopNav.categories.length > 0
        ? Math.min(selectedCategoryIndex, selectedTopNav.categories.length - 1)
        : 0;

    const updateTopNavItem = (index: number, field: keyof TopNavItem, value: string) => {
        const newData = { ...editData };
        if (field === 'label' || field === 'url') {
            newData.topNavItems[index][field] = value;
        }
        setEditData(newData);
    };

    const updateCategory = (topNavIndex: number, categoryIndex: number, field: keyof MenuCategory, value: string) => {
        const newData = { ...editData };
        if (field === 'title') {
            newData.topNavItems[topNavIndex].categories[categoryIndex][field] = value;
        }
        setEditData(newData);
    };

    const updateSubItem = (topNavIndex: number, categoryIndex: number, itemIndex: number, field: keyof MenuSubItem, value: string) => {
        const newData = { ...editData };
        if (field === 'label' || field === 'url') {
            newData.topNavItems[topNavIndex].categories[categoryIndex].items[itemIndex][field] = value;
        }
        setEditData(newData);
    };

    const addCategory = (topNavIndex: number) => {
        const newData = { ...editData };
        const newCategory: MenuCategory = {
            id: `category-${Date.now()}`,
            title: 'New Category',
            items: []
        };
        newData.topNavItems[topNavIndex].categories.push(newCategory);
        setEditData(newData);
    };

    const addTopNavItem = () => {
        const newData = { ...editData };
        const newTopNavItem: TopNavItem = {
            id: `menuitem-${Date.now()}`,
            label: `MenuItem${newData.topNavItems.length + 1}`,
            categories: []
        };
        newData.topNavItems.push(newTopNavItem);
        setEditData(newData);
        setSelectedTopNavIndex(newData.topNavItems.length - 1);
    };

    const removeTopNavItem = (topNavIndex: number) => {
        const newData = { ...editData };
        newData.topNavItems.splice(topNavIndex, 1);
        setEditData(newData);
        if (selectedTopNavIndex >= newData.topNavItems.length) {
            setSelectedTopNavIndex(Math.max(0, newData.topNavItems.length - 1));
        }
    };

    const addSubItem = (topNavIndex: number, categoryIndex: number) => {
        const newData = { ...editData };
        const newItem: MenuSubItem = {
            id: `item-${Date.now()}`,
            label: 'New Item'
        };
        newData.topNavItems[topNavIndex].categories[categoryIndex].items.push(newItem);
        setEditData(newData);
    };

    const removeCategory = (topNavIndex: number, categoryIndex: number) => {
        const newData = { ...editData };
        newData.topNavItems[topNavIndex].categories.splice(categoryIndex, 1);
        setEditData(newData);
        if (selectedCategoryIndex >= newData.topNavItems[topNavIndex].categories.length) {
            setSelectedCategoryIndex(Math.max(0, newData.topNavItems[topNavIndex].categories.length - 1));
        }
    };

    const removeSubItem = (topNavIndex: number, categoryIndex: number, itemIndex: number) => {
        const newData = { ...editData };
        newData.topNavItems[topNavIndex].categories[categoryIndex].items.splice(itemIndex, 1);
        setEditData(newData);
    };

    const handleSave = () => {
        onSave(editData);
    };

    const handleReset = () => {
        onReset();
    };

    return (
        <div className="menu-settings">
            <Flex column gap="gap.medium">
                {/* Top Navigation Selection */}
                <div className="config-section">
                    <div className="config-section-header">
                        <Text content="1. Select Top Navigation Item" className="config-section-title" />
                        <Button
                            content="+ Add New Menu Item"
                            primary
                            onClick={addTopNavItem}
                        />
                    </div>
                    <div className="config-section-description">
                        Choose a menu item to configure its categories and sub-items
                    </div>

                    <div className="menu-selection-grid">
                        {editData.topNavItems.map((item, index) => (
                            <div key={item.id} className="menu-item-container">
                                <Button
                                    content={item.label}
                                    primary={safeTopNavIndex === index}
                                    className="menu-selection-button"
                                    onClick={() => {
                                        setSelectedTopNavIndex(index);
                                        setSelectedCategoryIndex(0);
                                    }}
                                />
                                {editData.topNavItems.length > 1 && (
                                    <Button
                                        content="Remove"
                                        size="small"
                                        className="menu-item-remove-button"
                                        onClick={() => removeTopNavItem(index)}
                                        title={`Remove ${item.label}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {selectedTopNav && (
                        <div className="form-grid-full">
                            <FormField label="Menu Item Label:">
                                <Input
                                    value={selectedTopNav.label}
                                    onChange={(_, data) => updateTopNavItem(safeTopNavIndex, 'label', data?.value || '')}
                                />
                            </FormField>
                        </div>
                    )}

                    {selectedTopNav && (
                        <div className="status-indicator">
                            ✓ Currently editing: <strong>{selectedTopNav.label}</strong>
                        </div>
                    )}
                </div>

                {/* Category Management */}
                <div className="config-section">
                    <div className="config-section-header">
                        <Text content="2. Manage Categories" className="config-section-title" />
                        <Button
                            content="+ Add New Category"
                            primary
                            onClick={() => addCategory(safeTopNavIndex)}
                        />
                    </div>
                    <div className="config-section-description">
                        Categories group related menu items together in the mega menu
                    </div>

                    {selectedTopNav && selectedTopNav.categories.length > 0 ? (
                        <>
                            <div className="category-selection-grid">
                                {selectedTopNav.categories.map((category, index) => (
                                    <Button
                                        key={category.id}
                                        content={category.title}
                                        primary={safeCategoryIndex === index}
                                        className="category-selection-button"
                                        onClick={() => setSelectedCategoryIndex(index)}
                                    />
                                ))}
                            </div>

                            {selectedTopNav.categories[safeCategoryIndex] && (
                                <div className="category-edit">
                                    <div className="category-edit-header">
                                        <Text content={`Editing: ${selectedTopNav.categories[safeCategoryIndex].title}`} weight="semibold" />
                                    </div>

                                    <div className="form-grid">
                                        <FormField label="Category Title:">
                                            <Input
                                                value={selectedTopNav.categories[safeCategoryIndex].title}
                                                onChange={(_, data) => updateCategory(safeTopNavIndex, safeCategoryIndex, 'title', data?.value || '')}
                                            />
                                        </FormField>
                                        <Button
                                            content="Remove Category"
                                            onClick={() => removeCategory(safeTopNavIndex, safeCategoryIndex)}
                                        />
                                    </div>

                                    <div className="status-indicator success">
                                        ✓ {selectedTopNav.categories[safeCategoryIndex].items.length} menu items in this category
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="empty-state">
                            <Text content="No categories yet. Click 'Add New Category' to get started." />
                        </div>
                    )}
                </div>

                {/* Sub Items Management */}
                <div className="config-section">
                    <div className="config-section-header">
                        <Text content="3. Manage Menu Items" className="config-section-title" />
                        {selectedTopNav && selectedTopNav.categories[safeCategoryIndex] && (
                            <Button
                                content="+ Add New Item"
                                onClick={() => addSubItem(safeTopNavIndex, safeCategoryIndex)}
                            />
                        )}
                    </div>
                    <div className="config-section-description">
                        Add individual menu items that will appear when users hover over the category
                    </div>

                    {selectedTopNav && selectedTopNav.categories[safeCategoryIndex] ? (
                        <div className="sub-items-list">
                            <div className="sub-items-header">
                                <Text content={`Items in "${selectedTopNav.categories[safeCategoryIndex].title}"`} weight="semibold" />
                                <Text content={`${selectedTopNav.categories[safeCategoryIndex].items.length} items`} size="small" />
                            </div>

                            {selectedTopNav.categories[safeCategoryIndex].items.length > 0 ? (
                                selectedTopNav.categories[safeCategoryIndex].items.map((item, itemIndex) => (
                                    <div key={item.id} className="sub-item-edit">
                                        <div className="sub-item-form">
                                            <FormField label="Item Label:">
                                                <Input
                                                    value={item.label}
                                                    placeholder="Menu item name"
                                                    onChange={(_, data) => updateSubItem(safeTopNavIndex, safeCategoryIndex, itemIndex, 'label', data?.value || '')}
                                                />
                                            </FormField>
                                            <FormField label="URL (optional):">
                                                <Input
                                                    value={item.url || ''}
                                                    placeholder="https://example.com"
                                                    onChange={(_, data) => updateSubItem(safeTopNavIndex, safeCategoryIndex, itemIndex, 'url', data?.value || '')}
                                                />
                                            </FormField>
                                            <Button
                                                content="Remove"
                                                onClick={() => removeSubItem(safeTopNavIndex, safeCategoryIndex, itemIndex)}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <Text content="No items in this category yet. Click 'Add New Item' to add one." />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <Text content="Select a category above to manage its menu items." />
                        </div>
                    )}
                </div>

                {/* Save Actions */}
                <div className="save-actions">
                    <div className="save-actions-content">
                        <Button content="Save All Changes" primary onClick={handleSave} />
                        <Button content="Reset to Default" onClick={handleReset} />
                        <Text content="Changes are automatically saved to your browser's local storage" size="small" />
                    </div>
                </div>
            </Flex>
        </div>
    );
};
