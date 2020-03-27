class Logger {
    static level = 4;
    static getLogger() {
        return console;
    }
    static info(...messages) {
        if (Logger.level === 4)
            Logger.getLogger().info.apply(null, messages);
    }
    static log(...messages) {
        if (Logger.level === 3)
            Logger.getLogger().log.apply(null, messages);
    }
    static warn(...messages) {
        if (Logger.level === 2)
            Logger.getLogger().warn.apply(null, messages);
    }
    static error(...messages) {
        if (Logger.level === 1)
            Logger.getLogger().error.apply(null, messages);
    }
}