package app

import "time"

type Config struct {
	ListenAddress  string
	Version        string
	BootstrapToken string
	TrustedProxies string
	DaeBinary      string
	DaeConfigPath  string
	BackupDir      string
	ServiceName    string
	Systemctl      string
	Journalctl     string
	DatabasePath   string
	SchedulePath   string
	// InstallStatePath 记录面板装了哪个 dae 版本，并存放回滚用的上一版二进制。
	InstallStatePath string
	SessionTTL       time.Duration
	SecureCookie     bool
	// EnableDaeInstall 打开通过面板安装与切换 dae 版本的能力。
	// 默认关闭：它要求放宽面板单元的 ReadWritePaths 才能写入 dae 所在目录，
	// 不使用这个功能的部署不该承担那份放宽。
	EnableDaeInstall bool
}

func DefaultConfig() Config {
	return Config{
		ListenAddress:  "127.0.0.1:2023",
		Version:        "dev",
		TrustedProxies: "127.0.0.0/8,::1/128",
		DaeBinary:      "dae",
		DaeConfigPath:  "/etc/dae/config.dae",
		BackupDir:      "/var/lib/kdae-panel/backups",
		ServiceName:    "dae",
		Systemctl:      "systemctl",
		Journalctl:     "journalctl",
		DatabasePath:   "/var/lib/kdae-panel/panel.db",
		SchedulePath:   "/var/lib/kdae-panel/schedule.json",
		// 上一版二进制也放在这个前缀下，因此目录必须在 ReadWritePaths 内。
		InstallStatePath: "/var/lib/kdae-panel/dae-install.json",
		SessionTTL:       12 * time.Hour,
	}
}

func (c Config) withDefaults() Config {
	defaults := DefaultConfig()
	if c.ListenAddress == "" {
		c.ListenAddress = defaults.ListenAddress
	}
	if c.Version == "" {
		c.Version = defaults.Version
	}
	if c.TrustedProxies == "" {
		c.TrustedProxies = defaults.TrustedProxies
	}
	if c.DaeBinary == "" {
		c.DaeBinary = defaults.DaeBinary
	}
	if c.DaeConfigPath == "" {
		c.DaeConfigPath = defaults.DaeConfigPath
	}
	if c.BackupDir == "" {
		c.BackupDir = defaults.BackupDir
	}
	if c.ServiceName == "" {
		c.ServiceName = defaults.ServiceName
	}
	if c.Systemctl == "" {
		c.Systemctl = defaults.Systemctl
	}
	if c.Journalctl == "" {
		c.Journalctl = defaults.Journalctl
	}
	if c.DatabasePath == "" {
		c.DatabasePath = defaults.DatabasePath
	}
	if c.SchedulePath == "" {
		c.SchedulePath = defaults.SchedulePath
	}
	if c.InstallStatePath == "" {
		c.InstallStatePath = defaults.InstallStatePath
	}
	if c.SessionTTL <= 0 {
		c.SessionTTL = defaults.SessionTTL
	}
	return c
}
