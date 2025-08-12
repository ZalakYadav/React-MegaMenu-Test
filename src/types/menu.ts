export interface MenuSubItem {
    id: string;
    label: string;
    url?: string;
    icon?: string;
    isActive?: boolean;
}

export interface MenuCategory {
    id: string;
    title: string;
    items: MenuSubItem[];
    isActive?: boolean;
}

export interface TopNavItem {
    id: string;
    label: string;
    url?: string;
    categories: MenuCategory[];
    isActive?: boolean;
}

export interface MegaMenuData {
    topNavItems: TopNavItem[];
}

export const defaultMenuData: MegaMenuData = {
    topNavItems: [
        {
            id: "menuitem1",
            label: "MenuItem1",
            categories: [
                {
                    id: "career-benefits",
                    title: "My Career and Benefits",
                    items: [
                        { id: "hrweb", label: "HRweb", url: "https://hrweb.example.com" },
                        { id: "benefits", label: "Benefits", url: "https://benefits.example.com" },
                        { id: "learning-portal", label: "Learning Portal", url: "https://learning.example.com" },
                        { id: "internal-jobs", label: "Internal Jobs", url: "https://jobs.example.com" },
                        { id: "company-store", label: "Company Store", url: "https://store.example.com" },
                        { id: "give", label: "Give", url: "https://give.example.com" }
                    ]
                },
                {
                    id: "travel-expense",
                    title: "Travel and Expense",
                    items: [
                        { id: "travel", label: "Travel", url: "https://travel.example.com" },
                        { id: "expenses", label: "Expenses", url: "https://expenses.example.com" },
                        { id: "payments", label: "Payments", url: "https://payments.example.com" },
                        { id: "us-immigration", label: "US Immigration Travel", url: "https://immigration.example.com" }
                    ]
                }
            ]
        },
        {
            id: "menuitem2",
            label: "MenuItem2",
            categories: [
                {
                    id: "tools-resources",
                    title: "Tools and Resources",
                    items: [
                        { id: "office-365", label: "Office 365", url: "https://office.com" },
                        { id: "teams", label: "Microsoft Teams", url: "https://teams.microsoft.com" },
                        { id: "sharepoint", label: "SharePoint", url: "https://sharepoint.com" },
                        { id: "onedrive", label: "OneDrive", url: "https://onedrive.com" },
                        { id: "power-bi", label: "Power BI", url: "https://powerbi.microsoft.com" },
                        { id: "yammer", label: "Yammer", url: "https://yammer.com" }
                    ]
                },
                {
                    id: "support-help",
                    title: "Support and Help",
                    items: [
                        { id: "help-desk", label: "Help Desk", url: "https://support.microsoft.com" },
                        { id: "it-support", label: "IT Support", url: "https://support.microsoft.com/it" },
                        { id: "documentation", label: "Documentation", url: "https://docs.microsoft.com" },
                        { id: "training", label: "Training Resources", url: "https://learn.microsoft.com" }
                    ]
                }
            ]
        },
        {
            id: "menuitem3",
            label: "MenuItem3",
            categories: []
        },
        {
            id: "menuitem4",
            label: "MenuItem4",
            categories: []
        },
        {
            id: "menuitem5",
            label: "MenuItem5",
            categories: []
        }
    ]
};
