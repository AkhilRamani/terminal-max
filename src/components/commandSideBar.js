import { useEffect, useState } from "react";
import {
    createStyles,
    Navbar,
    Title,
} from "@mantine/core";
import { useCommandStore } from "../store/command.store";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
    },
    main: {
        flex: 1,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
    title: {
        boxSizing: "border-box",
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.md,
        paddingTop: 18,
        height: 60,
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    },
    link: {
        boxSizing: "border-box",
        display: "block",
        textDecoration: "none",
        borderTopRightRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        padding: `0 ${theme.spacing.md}px`,
        fontSize: theme.fontSizes.sm,
        marginRight: theme.spacing.md,
        fontWeight: 500,
        height: 44,
        lineHeight: "44px",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    linkActive: {
        "&, &:hover": {
            borderLeftColor: theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
            }).background,
            backgroundColor: theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
            }).background,
            color: theme.white,
        },
    },
}));

const SideBarNavItem = ({ data, onClick, activeItem }) => {
    const { classes, cx } = useStyles();
    return (
        <a
            className={cx(classes.link, {
                [classes.linkActive]: activeItem?.key === data.key,
            })}
            href="/"
            onClick={(event) => {
                event.preventDefault();
                onClick(data)
            }}
            key={data.name}
        >
            {data.displayTitle}
        </a>
    )
}

export const CommandSideBar = ({ commandConfig }) => {
    const { classes } = useStyles();
    const commandItems = commandConfig.reduce((acc, app) => {
        const commands = app.commands?.map((command) => ({
            ...command,
            app: app.app,
            key: `${app.name}-${command.name}`
        }))
        return [...acc, ...commands]
    }, [])

    const { activeCommand, setActiveCommand } = useCommandStore(s => s)
    
    useEffect(() => {setActiveCommand(commandItems[0])}, [])

    const links = commandItems.map(commandItem => <SideBarNavItem key={commandItem.key} data={commandItem} onClick={data => setActiveCommand(data)} activeItem={activeCommand} />)

    return (
        <Navbar height="100vh" width={{ xs: 250 }}>
            <Navbar.Section grow className={classes.wrapper}>
                <div className={classes.main}>
                    <Title order={4} className={classes.title}>Terminal Max</Title>
                    {links}
                </div>
            </Navbar.Section>
        </Navbar>
    );
}
