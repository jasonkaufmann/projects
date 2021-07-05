using System;
using System.IO;
using System.Windows;
using System.ComponentModel;
using System.Diagnostics;
using System.IO.Compression;
using System.Net;

namespace DigitalLogicSimulatorUpdater
{
    enum LauncherStatus
    {
        ready, 
        failed, 
        downloadingGame,
        downloadingUpdate
    }
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        private string rootPath;
        private string versionFile;
        private string gameZip;
        private string gameExe;

        private LauncherStatus _status;
        internal LauncherStatus Status
        {
            get => _status;
            set
            {
                _status = value;
                switch(_status)
                {
                    case LauncherStatus.ready:
                        updateResult.Text = "Play";
                        break;
                    case LauncherStatus.failed:
                        updateResult.Text = "Update Failed - Retry";
                        break;
                    case LauncherStatus.downloadingGame:
                        updateResult.Text = "Downloading Game";
                        break;
                    case LauncherStatus.downloadingUpdate:
                        updateResult.Text = "Downloading Update";
                        break;
                    default:
                        break;
                }                                                 
            }
        }
        public MainWindow()
        {
            InitializeComponent();

            //this.SizeToContent = System.Windows.SizeToContent.WidthAndHeight;
            this.Loaded += MainWindow_Loaded;

            rootPath = Directory.GetCurrentDirectory();
            versionFile = System.IO.Path.Combine(rootPath, "version.txt");
            gameExe = System.IO.Path.Combine(rootPath, "DigitalLogicSimulator.exe");
        }

        private void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            this.MinWidth = this.Width;
            this.MinHeight = this.Height;
            this.MaxWidth = this.Width;
            this.MaxHeight = this.Height;
        }

        private void CheckForUpdates()
        {
            if(File.Exists(versionFile))
            {
                Version localVersion = new Version(File.ReadAllText(versionFile));
                VersionText.Text = localVersion.ToString();
            }
        }

        private void Window_ContentRendered(object sender, EventArgs e)
        {
            CheckForUpdates();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Trace.WriteLine("FLAG");
        }
    }

    struct Version
    {
        internal static Version zero = new Version(0, 0, 0);

        private short major;
        private short minor;
        private short subMinor;

        internal Version(short _major, short _minor, short _subMinor)
        {
            major = _major;
            minor = _minor;
            subMinor = _subMinor;
        }

        internal Version (string _version)
        {
            string[] _versionStrings = _version.Split(".");
            if(_versionStrings.Length != 3)
            {
                major = 0;
                minor = 0;
                subMinor = 0;
                return;
            }

            major = short.Parse(_versionStrings[0]);
            minor = short.Parse(_versionStrings[1]);
            subMinor = short.Parse(_versionStrings[2]);
        }
        internal bool IsDifferentThan(Version _otherVersion)
        {
            if(major != _otherVersion.major)
            {
                return true;
            }
            else
            {
                if(minor != _otherVersion.minor) 
                {
                    return true;
                } else
                {
                    if(subMinor != _otherVersion.subMinor)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public override string ToString()
        {
            return $"{major}.{minor}.{subMinor}";
        }
    }
}
