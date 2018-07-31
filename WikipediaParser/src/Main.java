import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Scanner;
import java.util.Set;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.LinkedHashMap;
import java.util.Queue;
import java.util.Collections;
import java.lang.Math;
import javax.swing.JOptionPane;

public class Main {
	/**
	 * Takes in the user input for the start and end pages and calls the parser.
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {

		System.out.println("From:");
		Scanner first = new Scanner(System.in);
		String start = first.nextLine();
		System.out.println("To:");
		Scanner second = new Scanner(System.in);
		String end = second.nextLine();
		second.close();
		System.out.println(" ");
		System.out.println("<Links>");
		WikipediaParser(start, end);
	}
	/**
	 * Parses input into a form Wikipedia can read, initializes Hashmap of child pages and their parents, and contains while loop that will 
	 * look for the pages until one is found, the runtime exceeds 15 minutes, or if the inputs are malformed.
	 * @param start user input string for the beginning Wikipedia page.
	 * @param end user input string for the target Wikipedia page.
	 * @throws IOException
	 */
	private static void WikipediaParser(String start, String end) throws IOException {
		int i = 1;
		int j = 1;
		int k = 1;
		int l = 1;
		String begin = start.replace(" ", "_");
		String checkEnd = end.replaceAll(" ", "_");
		if (checkEnd.contains("'")) {
			checkEnd = checkEnd.replace("'", "%27");
		} 
		if (begin.contains("'")) {
			end = end.replace("'", "%27");
		}
		String link = begin;
		String url_end = checkEnd;
		l=checkInput(link);
		j=checkInput(url_end);
		if (l == 2) {
			System.out.println("Invalid start wikipedia page! Check input and try again.");
			if (j!=2) {
			System.out.println("</Links>");
			}
			i=2;
		}
		if (j == 2) {
			System.out.println("Invalid end wikipedia page! Check input and try again.");
			System.out.println("</Links>");
			i=2;
		}
		Queue<String> queue = new LinkedList<String>();
		Map<String, String> parents = new LinkedHashMap<String, String>();
		parents.put(begin, "12345678");
		long startTime = System.currentTimeMillis();
		while (i == 1) {
			i = getLinks(link, end, queue, parents);
			long endTime = System.currentTimeMillis();
			/*if (endTime - startTime > 900000) {
				System.out.println("</Links>");
				JOptionPane.showMessageDialog(null,
						"I'm tired. Can't search anymore." + "\n" +"Either the connection is too distant, or there is no connection."+"\n"+
			"The world may never know.","Wikipedia Game Solver", JOptionPane.DEFAULT_OPTION);
				break;
			}*/
			link = queue.remove();
			System.out.println(link);
		}
		done(i,start,end,startTime,parents);
	}
	
	/**
	 * If the target is found, it makes an array with the path by calling the parents Hashmap from the target node, backwards, to the beginning node; calculates the runtime and 
	 * prints JFrame window with all the information about the search.
	 * @param i variable to determine if the target page was found
	 * @param start the start page
	 * @param end the target page
	 * @param startTime the time, in milliseconds, when the program started
	 * @param parents a Hashmap that includes all the pages searched and their parents (which Wikipedia page they appeared on)
	 */
	private static void done(int i, String start, String end, long startTime, Map<String, String> parents ) {
		if (i == 0) {
			System.out.println("</Links>");
			for (int t = 1; t < 5; t++) {
				System.out.println(" ");
			}
			List<String> out = new LinkedList<String>();
			String n = end;
			while (n != "12345678") {
				out.add(n);
				n = parents.get(n);
			}
			Collections.reverse(out);
			out.remove(0);
			out.add(0, start);
			int a = out.size() - 1;
			long endTime = System.currentTimeMillis();
			double runTime = endTime - startTime;
			double second = (runTime / 1000) % 60;
			second=(Math.round(second)*1000.0)/1000.0;
			double minute_f = (runTime / (1000 * 60)) % 60;
			int minute=(int)Math.round(minute_f);
			runTime = Math.round(runTime * 100.0) / 100.0;
			if (a == 1) {
				JOptionPane.showMessageDialog(null,
						"Found Connection!" + "\n" + "Example Path-" + out + "\n" + "That was easy!" + "\n"
								+ "Degree of Separation: " + a + "\n" + "Runtime: " + minute + "min" +" "+second+"sec",
						"Wikipedia Game Solver", JOptionPane.DEFAULT_OPTION);
			} else if (a == 2) {
				JOptionPane.showMessageDialog(null,
						"Found Connection!" + "\n" + "Example Path-" + out + "\n" + "We made it!" + "\n"
								+ "Degree of Separation: " + a + "\n" + "Runtime: " + minute + "min" +" "+second+"sec",
						"Wikipedia Game Solver", JOptionPane.DEFAULT_OPTION);
			} else if (a == 3) {
				JOptionPane.showMessageDialog(null,
						"Found Connection!" + "\n" + "Example Path-" + out + "\n" + "That was hard!" + "\n"
								+ "Degree of Separation: " + a + "\n" + "Runtime: " + minute + "min" +" "+second+"sec",
						"Wikipedia Game Solver", JOptionPane.DEFAULT_OPTION);
			} else if (a == 4) {
				JOptionPane.showMessageDialog(null,
						"Found Connection!" + "\n" + "Example Path-" + out + "\n" + "You still there?" + "\n"
								+ "Degree of Separation: " + a + "\n" + "Runtime: " + runTime + "min",
						"Wikipedia Game Solver", JOptionPane.DEFAULT_OPTION);
			}
		}
		
	}
	
	/**
	 * Checks both the inputs to check if they are valid.
	 * @param input either the start or end pages that the user inputs
	 * @return
	 * @throws IOException
	 */
	private static int checkInput(String input) throws IOException {
		JsonElement jsonElement;
		String baseURL = "https://en.wikipedia.org/w/api.php?action=query&titles=";
		String getLinks = "&prop=links&pllimit=max&format=json";
		String link_f = baseURL + input + getLinks;
		URL url = new URL(link_f);
		HttpURLConnection request = (HttpURLConnection) url.openConnection();
		request.connect();
		jsonElement = new JsonParser().parse(new InputStreamReader((java.io.InputStream) request.getContent()));
		JsonElement pages = jsonElement.getAsJsonObject().get("query").getAsJsonObject().get("pages");

		Set<Entry<String, JsonElement>> entrySet = pages.getAsJsonObject().entrySet();

		JsonElement yourDesiredElement = null;
		Gson gson = new Gson();
		for (Map.Entry<String, JsonElement> entry : entrySet) {
			yourDesiredElement = entry.getValue();
		}
		if (yourDesiredElement.toString().contains("\"missing\":\"\"")) {
			return 2;
		}
		return 1;
	}
	
	/**
	 * takes in a Wikipedia page to search, finds all the outgoing links on that page using the Wikipedia API, adds the items to the queue (using a BFS structure), puts the links
	 * found on the page into the parents Hashmap with the parent being the current page being parsed, and checks if the links found is the target link
	 * @param link the Wikipedia page to parse
	 * @param end the target page
	 * @param queue contains all the links that get parsed
	 * @param parents contains the child, parent relationships for all the pages.
	 * @return integer that determines whether the search continues or not
	 * @throws IOException
	 */
	private static int getLinks(String link, String end, Queue<String> queue, Map<String, String> parents)
			throws IOException {
		int a = 1;
		JsonElement jsonElement;
		String baseURL = "https://www.dmv.org/ajax/Polk/getMakes?year=2014";
		String getLinks = "&prop=links&pllimit=max&format=json";
		String parse = link.replaceAll(" ", "_");
		String link_f = baseURL + parse + getLinks;
		URL url = new URL(link_f);
		HttpURLConnection request = (HttpURLConnection) url.openConnection();
		request.connect();
		jsonElement = new JsonParser().parse(new InputStreamReader((java.io.InputStream) request.getContent()));
		JsonElement pages = jsonElement.getAsJsonObject().get("query").getAsJsonObject().get("pages");

		Set<Entry<String, JsonElement>> entrySet = pages.getAsJsonObject().entrySet();

		JsonElement yourDesiredElement = null;
		Gson gson = new Gson();
		for (Map.Entry<String, JsonElement> entry : entrySet) {
			yourDesiredElement = entry.getValue();
		}
		Links json = gson.fromJson(yourDesiredElement, Links.class);
		if (!yourDesiredElement.toString().contains("\"missing\":\"\"") && json.links != null) {
			for (Title hi : json.links) {
				String title = gson.toJson(hi);
				if (title.contains("\"ns\":0")) {
					String title_f = title.substring(title.indexOf(":", title.indexOf(":") + 1)).replaceAll("\"", "")
							.replaceAll("}", "").substring(1);
					Pattern pattern = Pattern.compile("(u0027)");
					Matcher matcher = pattern.matcher(title_f);
					if (matcher.find()) {
						title_f = title_f.replaceAll("(u0027)", "%27");
						title_f = title_f.replace("\\", "");
					}
					if (link.contains("&")) {
						String[] parts = link.split("\\&");
						link = parts[0];
					}
					if (parents.get(title_f) == null) {
						queue.add(title_f);
						parents.put(title_f, link);
					}
					if (title_f.matches(end)) {
						a = 0;
					}
				}
			}
		} else {
			a = 1;
		}
		JsonElement next = jsonElement.getAsJsonObject().get("continue");
		if (next != null && a == 1) {
			a = getLinks(link + "&plcontinue=" + gson.fromJson(next, next.class).plcontinue.toString(), end, queue,
					parents);
		}
		return a;
	}

	/**
	 * the JSON format for a valid Wikipedia page
	 * @author jason
	 */
	class Links {
		int id;
		int ns;
		String title;
		ArrayList<Title> links;
	}
	
	/**
	 * plcontinue is needed as the Wikiepdia API only gives - max - 500 links at a time, so it allows for getLinks() to call it itself again to
	 * get all the links for a specific Wikipedia page
	 * @author jason
	 */
	class next {
		String plcontinue;
	}
	
	/**
	 * JSON structure for all the links on a Wikipedia page obtained through the Wikipedia API
	 * @author jason
	 */
	class Title {
		int ns;
		String title;
	}

}