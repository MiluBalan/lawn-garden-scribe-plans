import { useState, useEffect } from 'react';

interface ZipcodeSuggestion {
  city: string;
  state: string;
  zipcode: string;
  formatted: string;
}

// Common US zipcode prefixes mapped to major cities
const zipcodePrefixes: Record<string, Array<{ city: string; state: string; zipcodes: string[] }>> = {
  '0': [
    { city: 'Boston', state: 'MA', zipcodes: ['02101', '02108', '02109', '02110', '02111'] },
    { city: 'Providence', state: 'RI', zipcodes: ['02901', '02903', '02904', '02905', '02906'] },
    { city: 'Manchester', state: 'NH', zipcodes: ['03101', '03102', '03103', '03104'] },
  ],
  '1': [
    { city: 'New York', state: 'NY', zipcodes: ['10001', '10002', '10003', '10004', '10005', '10011', '10012', '10013', '10014', '10016', '10017', '10018', '10019', '10020', '10021', '10022', '10023', '10024', '10025'] },
    { city: 'Brooklyn', state: 'NY', zipcodes: ['11201', '11203', '11205', '11206', '11211', '11212', '11213', '11215', '11216', '11217', '11218', '11219', '11220', '11221', '11222', '11223', '11224', '11225', '11226'] },
    { city: 'Queens', state: 'NY', zipcodes: ['11101', '11102', '11103', '11104', '11105', '11106'] },
  ],
  '2': [
    { city: 'Washington', state: 'DC', zipcodes: ['20001', '20002', '20003', '20004', '20005', '20006', '20007', '20008', '20009', '20010'] },
    { city: 'Arlington', state: 'VA', zipcodes: ['22201', '22202', '22203', '22204', '22205', '22206'] },
  ],
  '3': [
    { city: 'Philadelphia', state: 'PA', zipcodes: ['19101', '19102', '19103', '19104', '19106', '19107'] },
    { city: 'Pittsburgh', state: 'PA', zipcodes: ['15201', '15202', '15203', '15204', '15205', '15206'] },
    { city: 'Atlanta', state: 'GA', zipcodes: ['30301', '30302', '30303', '30304', '30305', '30306', '30307', '30308', '30309', '30310'] },
  ],
  '4': [
    { city: 'Miami', state: 'FL', zipcodes: ['33101', '33109', '33125', '33126', '33127', '33128', '33129', '33130', '33131', '33132', '33133', '33134', '33135', '33136', '33137', '33138', '33139', '33140', '33141', '33142', '33143', '33144', '33145', '33146'] },
    { city: 'Tampa', state: 'FL', zipcodes: ['33601', '33602', '33603', '33604', '33605', '33606', '33607', '33608', '33609', '33610', '33611', '33612', '33613', '33614', '33615', '33616', '33617', '33618', '33619', '33620'] },
    { city: 'Orlando', state: 'FL', zipcodes: ['32801', '32802', '32803', '32804', '32805', '32806', '32807', '32808', '32809', '32810'] },
  ],
  '6': [
    { city: 'Chicago', state: 'IL', zipcodes: ['60601', '60602', '60603', '60604', '60605', '60606', '60607', '60608', '60609', '60610', '60611', '60612', '60613', '60614', '60615', '60616', '60617', '60618', '60619', '60620'] },
    { city: 'St. Louis', state: 'MO', zipcodes: ['63101', '63102', '63103', '63104', '63105', '63106', '63107', '63108', '63109', '63110'] },
    { city: 'Kansas City', state: 'MO', zipcodes: ['64101', '64102', '64105', '64106', '64108', '64109', '64110', '64111', '64112', '64113', '64114', '64115', '64116', '64117', '64118', '64119', '64120'] },
  ],
  '7': [
    { city: 'Dallas', state: 'TX', zipcodes: ['75201', '75202', '75203', '75204', '75205', '75206', '75207', '75208', '75209', '75210', '75211', '75212', '75214', '75215', '75216', '75217', '75218', '75219', '75220'] },
    { city: 'Houston', state: 'TX', zipcodes: ['77001', '77002', '77003', '77004', '77005', '77006', '77007', '77008', '77009', '77010', '77011', '77012', '77013', '77014', '77015', '77016', '77017', '77018', '77019', '77020'] },
    { city: 'Austin', state: 'TX', zipcodes: ['78701', '78702', '78703', '78704', '78705', '78712', '78719', '78721', '78722', '78723', '78724', '78725', '78726', '78727', '78728', '78729', '78730'] },
  ],
  '8': [
    { city: 'Denver', state: 'CO', zipcodes: ['80201', '80202', '80203', '80204', '80205', '80206', '80207', '80208', '80209', '80210', '80211', '80212', '80214', '80215', '80216', '80218', '80219', '80220'] },
    { city: 'Phoenix', state: 'AZ', zipcodes: ['85001', '85003', '85004', '85006', '85007', '85008', '85009', '85012', '85013', '85014', '85015', '85016', '85017', '85018', '85019', '85020'] },
  ],
  '9': [
    { city: 'Los Angeles', state: 'CA', zipcodes: ['90001', '90002', '90003', '90004', '90005', '90006', '90007', '90008', '90010', '90011', '90012', '90013', '90014', '90015', '90016', '90017', '90018', '90019', '90020'] },
    { city: 'San Francisco', state: 'CA', zipcodes: ['94101', '94102', '94103', '94104', '94105', '94107', '94108', '94109', '94110', '94111', '94112', '94114', '94115', '94116', '94117', '94118', '94121', '94122', '94123', '94124'] },
    { city: 'San Diego', state: 'CA', zipcodes: ['92101', '92102', '92103', '92104', '92105', '92106', '92107', '92108', '92109', '92110', '92111', '92113', '92114', '92115', '92116', '92117', '92118', '92119', '92120'] },
    { city: 'Seattle', state: 'WA', zipcodes: ['98101', '98102', '98103', '98104', '98105', '98106', '98107', '98108', '98109', '98112', '98115', '98116', '98117', '98118', '98119', '98121', '98122', '98125', '98126', '98133', '98134', '98144', '98155', '98164', '98174', '98177', '98195', '98199'] },
    { city: 'Portland', state: 'OR', zipcodes: ['97201', '97202', '97203', '97204', '97205', '97206', '97209', '97210', '97211', '97212', '97213', '97214', '97215', '97216', '97217', '97218', '97219', '97220'] },
  ],
};

const getMatchingSuggestions = (digits: string): ZipcodeSuggestion[] => {
  const prefix = digits[0];
  const cities = zipcodePrefixes[prefix] || [];
  
  const matches: ZipcodeSuggestion[] = [];
  
  cities.forEach(city => {
    const matchingZipcodes = city.zipcodes.filter(zip => zip.startsWith(digits));
    matchingZipcodes.forEach(zipcode => {
      matches.push({
        city: city.city,
        state: city.state,
        zipcode: zipcode,
        formatted: `${city.city}, ${city.state} ${zipcode}`
      });
    });
  });
  
  return matches.slice(0, 10); // Limit to 10 suggestions
};

export const useZipcodeAutocomplete = (query: string) => {
  const [suggestions, setSuggestions] = useState<ZipcodeSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query || query.length < 1) {
        setSuggestions([]);
        return;
      }

      // Extract any digits from the query
      const digits = query.replace(/\D/g, '');
      
      if (digits.length === 0) {
        setSuggestions([]);
        return;
      }

      // Show suggestions for 2+ digits
      if (digits.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        // If we have 5 digits, try exact match from API
        if (digits.length === 5) {
          const response = await fetch(`https://api.zippopotam.us/us/${digits}`);
          if (response.ok) {
            const data = await response.json();
            const suggestions: ZipcodeSuggestion[] = data.places.map((place: any) => ({
              city: place['place name'],
              state: place['state abbreviation'],
              zipcode: data['post code'],
              formatted: `${place['place name']}, ${place['state abbreviation']} ${data['post code']}`
            }));
            setSuggestions(suggestions);
          } else {
            // Fallback to prefix matching if API fails
            const prefixMatches = getMatchingSuggestions(digits);
            setSuggestions(prefixMatches);
          }
        } else {
          // For 2-4 digits, use prefix matching
          const prefixMatches = getMatchingSuggestions(digits);
          setSuggestions(prefixMatches);
        }
      } catch (error) {
        console.error('Error fetching zipcode data:', error);
        // Fallback to prefix matching on error
        const prefixMatches = getMatchingSuggestions(digits);
        setSuggestions(prefixMatches);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { suggestions, loading };
};
