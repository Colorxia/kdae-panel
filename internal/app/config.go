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
	// GeoStatePath 记录面板上次把 geo 数据更新到了哪一版。
	GeoStatePath string
	// EnableGeoUpdate 打开一键更新 geo 数据的能力，与 EnableDaeInstall 相互独立。
	//
	// 分成两个开关是有意为之：更新 geo 只写 dae 的数据目录（通常就是已经可写的
	// 配置目录），既不碰可执行文件也不碰 systemd 单元，不具备"面板缺陷升级为
	// 任意代码执行"的性质。把它并进 EnableDaeInstall，等于逼着只想刷新 geo 的
	// 人把 dae 二进制目录也交出去——那反而更不安全。
	//
	// 仍然默认关闭：它给部署新增了一条常态化的"联网取字节→以 root 写系统目录"
	// 路径，而这条路径在默认部署里本来并不存在。
	EnableGeoUpdate bool
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
		GeoStatePath:     "/var/lib/kdae-panel/geo-update.json",
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
	if c.GeoStatePath == "" {
		c.GeoStatePath = defaults.GeoStatePath
	}
	if c.InstallStatePath == "" {
		c.InstallStatePath = defaults.InstallStatePath
	}
	if c.SessionTTL <= 0 {
		c.SessionTTL = defaults.SessionTTL
	}
	return c
}
