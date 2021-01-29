import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function AppTabs({
    tabs,
    activeTab,
    handleChangeTab
}) {
    return (
        <Tabs value={activeTab} onChange={handleChangeTab}>
            {tabs.map((tab, i) => <Tab key={i} label={tab} value={i} />)}
        </Tabs>
    )
}