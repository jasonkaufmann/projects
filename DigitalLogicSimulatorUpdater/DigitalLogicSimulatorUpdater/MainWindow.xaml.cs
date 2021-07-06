using System;
using System.IO;
using System.Windows;
using System.ComponentModel;
using System.Diagnostics;
using System.IO.Compression;
using System.Net;
using System.Drawing;
using System.Drawing.Drawing2D;

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
                        updateResult.Text = "Click above to run";
                        checkForUpdate.Content = "Play";
                        LoadingAnimation.Visibility = Visibility.Hidden;
                        break;
                    case LauncherStatus.failed:
                        updateResult.Text = "Update Failed - Retry";
                        break;
                    case LauncherStatus.downloadingGame:
                        updateResult.Text = "Downloading Game";
                        LoadingAnimation.Visibility = Visibility.Visible;
                        break;
                    case LauncherStatus.downloadingUpdate:
                        updateResult.Text = "Downloading Update";
                        LoadingAnimation.Visibility = Visibility.Visible;
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
            gameExe = Path.Combine(rootPath,"Build", "DigitalLogicSimulator.exe");
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
            if(File.Exists(versionFile))
            {
                Version localVersion = new Version(File.ReadAllText(versionFile));
                VersionText.Text = localVersion.ToString();

                try
                {
                    WebClient webClient = new WebClient();
                    Version onlineVersion = new Version(webClient.DownloadString("https://raw.githubusercontent.com/jasonkaufmann/projects/master/DLSBuildLocation/version.txt"));

                    if(onlineVersion.IsDifferentThan(localVersion))
                    {
                        InstallGameFiles(true, onlineVersion);
                    } else
                    {
                        Status = LauncherStatus.ready;
                    }

                } catch (Exception ex)
                {
                    Status = LauncherStatus.failed;
                    MessageBox.Show($"Error checking for game updates: {ex}");

                }
            } else
            {
                InstallGameFiles(false, Version.zero);
            }
        }

        private void InstallGameFiles(bool _isUpdate, Version _onlineVersion)
        {
            try
            {
                WebClient webClient = new WebClient();
                if(_isUpdate)
                {
                    Status = LauncherStatus.downloadingUpdate;
                } else
                {
                    Status = LauncherStatus.downloadingGame;
                    _onlineVersion = new Version(webClient.DownloadString("https://raw.githubusercontent.com/jasonkaufmann/projects/master/DLSBuildLocation/version.txt"));

                }

                webClient.DownloadFileCompleted += new AsyncCompletedEventHandler(DownloadGameCompletedCallback);
                webClient.DownloadFileAsync(new Uri("https://raw.githubusercontent.com/jasonkaufmann/projects/master/DLSBuildLocation/Build.zip"), gameZip, _onlineVersion);
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
                ZipFile.ExtractToDirectory(gameZip, rootPath, true);
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

        public static Image RotateImage(Image img, float rotationAngle)
        {
            //create an empty Bitmap image
            Bitmap bmp = new Bitmap(img.Width, img.Height);

            //turn the Bitmap into a Graphics object
            Graphics gfx = Graphics.FromImage(bmp);

            //now we set the rotation point to the center of our image
            gfx.TranslateTransform((float)bmp.Width / 2, (float)bmp.Height / 2);

            //now rotate the image
            gfx.RotateTransform(rotationAngle);

            gfx.TranslateTransform(-(float)bmp.Width / 2, -(float)bmp.Height / 2);

            //set the InterpolationMode to HighQualityBicubic so to ensure a high
            //quality image once it is transformed to the specified size
            gfx.InterpolationMode = InterpolationMode.HighQualityBicubic;

            //now draw our new image onto the graphics object
            gfx.DrawImage(img, new System.Drawing.Point(0, 0));

            //dispose of our Graphics object
            gfx.Dispose();

            //return the image
            return bmp;
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
            else if(Status == LauncherStatus.failed)
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
