import type { MegaMenuData } from '../types/menu';
import { defaultMenuData } from '../types/menu';

const MENU_STORAGE_KEY = 'megaMenuData';

export const MenuStorageUtils = {
    saveMenuData: (menuData: MegaMenuData): void => {
        try {
            localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuData));
        } catch (error) {
            console.error('Failed to save menu data to localStorage:', error);
        }
    },

    loadMenuData: (): MegaMenuData => {
        try {
            const storedData = localStorage.getItem(MENU_STORAGE_KEY);
            if (storedData) {
                return JSON.parse(storedData) as MegaMenuData;
            }
        } catch (error) {
            console.error('Failed to load menu data from localStorage:', error);
        }
        return defaultMenuData;
    },

    resetMenuData: (): MegaMenuData => {
        MenuStorageUtils.saveMenuData(defaultMenuData);
        return defaultMenuData;
    },

    hasStoredData: (): boolean => {
        return localStorage.getItem(MENU_STORAGE_KEY) !== null;
    }
};
