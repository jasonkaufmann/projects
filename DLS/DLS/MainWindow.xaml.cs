using System.IO;
using System.Windows;
using System.ComponentModel;
using System.Diagnostics;
using System.IO.Compression;
using System.IO.Packaging;
using System.Net;
using System.Linq;
using System;

namespace DigitalLogicSimulatorUpdater
{
    enum LauncherStatus
    {
        ready,
        failed,
        downloadingGame,
        downloadingUpdate,
        applicationOpen
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
                switch (_status)
                {
                    case LauncherStatus.ready:
                        updateResult.Text = "Click above to run";
                        checkForUpdate.Content = "Run";
                        LoadingAnimation.Visibility = Visibility.Hidden;
                        break;
                    case LauncherStatus.failed:
                        updateResult.Text = "Update Failed - Retry";
                        LoadingAnimation.Visibility = Visibility.Hidden;
                        break;
                    case LauncherStatus.downloadingGame:
                        updateResult.Text = "Downloading Program";
                        LoadingAnimation.Visibility = Visibility.Visible;
                        break;
                    case LauncherStatus.downloadingUpdate:
                        updateResult.Text = "Downloading Update";
                        LoadingAnimation.Visibility = Visibility.Visible;
                        break;
                    case LauncherStatus.applicationOpen:
                        updateResult.Text = "Close Application and Retry";
                        LoadingAnimation.Visibility = Visibility.Hidden;
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
            //Trace.WriteLine("FLAG!");
            //Trace.WriteLine(rootPath);
            //Trace.WriteLine("FLAG!");
            versionFile = Path.Combine(rootPath, "version.txt");
            gameExe = Path.Combine(rootPath, "Build", "DigitalLogicSimulator.exe");
            gameZip = Path.Combine(rootPath, "Build.zip");
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
            if (File.Exists(versionFile))
            {
                Version localVersion = new Version(File.ReadAllText(versionFile));
                VersionText.Text = localVersion.ToString();

                try
                {
                    WebClient webClient = new WebClient();
                    Version onlineVersion = new Version(webClient.DownloadString("https://raw.githubusercontent.com/jasonkaufmann/projects/master/DLSBuildLocation/version.txt"));

                    if (onlineVersion.IsDifferentThan(localVersion))
                    {
                        InstallGameFiles(true, onlineVersion);
                    }
                    else
                    {
                        Status = LauncherStatus.ready;
                    }

                }
                catch (Exception ex)
                {
                    Status = LauncherStatus.failed;
                    MessageBox.Show($"Error checking for game updates: {ex}");

                }
            }
            else
            {
                InstallGameFiles(false, Version.zero);
            }
        }

        private void InstallGameFiles(bool _isUpdate, Version _onlineVersion)
        {
            try
            {
                WebClient webClient = new WebClient();
                if (_isUpdate)
                {
                    Status = LauncherStatus.downloadingUpdate;
                }
                else
                {
                    Status = LauncherStatus.downloadingGame;
                    _onlineVersion = new Version(webClient.DownloadString("https://raw.githubusercontent.com/jasonkaufmann/projects/master/DLSBuildLocation/version.txt"));

                }

                bool isRunning = Process.GetProcessesByName("DigitalLogicSimulator.exe")
               .FirstOrDefault(p => p.MainModule.FileName.StartsWith(gameExe)) != default(Process);

                if (isRunning)
                {
                    Status = LauncherStatus.applicationOpen;
                }
                else
                {
                    webClient.DownloadFileCompleted += new AsyncCompletedEventHandler(DownloadGameCompletedCallback);
                    webClient.DownloadFileAsync(new Uri("https://raw.githubusercontent.com/jasonkaufmann/projects/master/DLSBuildLocation/Build.zip"), gameZip, _onlineVersion);
                }

            }
            catch (Exception ex)
            {
                Status = LauncherStatus.failed;
                MessageBox.Show($"Error installing game files: {ex}");

            }

        }

        private void DownloadGameCompletedCallback(object sender, AsyncCompletedEventArgs e)
        {
            try
            {
                string onlineVersion = ((Version)e.UserState).ToString();
                Directory.Delete(Path.Combine(rootPath, "Build"), true);
                ZipFile.ExtractToDirectory(gameZip, rootPath);
                File.Delete(gameZip);
                File.WriteAllText(versionFile, onlineVersion);

                VersionText.Text = onlineVersion;
                Status = LauncherStatus.ready;
            }
            catch (Exception ex)
            {
                Status = LauncherStatus.failed;
                MessageBox.Show($"Error finishing download: {ex}");

            }
        }

        private void Window_ContentRendered(object sender, EventArgs e)
        {
            CheckForUpdates();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (File.Exists(gameExe) && Status == LauncherStatus.ready)
            {
                ProcessStartInfo startInfo = new ProcessStartInfo(gameExe);
                startInfo.WorkingDirectory = Path.Combine(rootPath, "Build");
                Process.Start(startInfo);
                Close();
            }
            else if (Status == LauncherStatus.failed)
            {
                CheckForUpdates();
            }
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

        internal Version(string _version)
        {
            string[] _versionStrings = _version.Split('.');
            if (_versionStrings.Length != 3)
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
            if (major != _otherVersion.major)
            {
                return true;
            }
            else
            {
                if (minor != _otherVersion.minor)
                {
                    return true;
                }
                else
                {
                    if (subMinor != _otherVersion.subMinor)
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
