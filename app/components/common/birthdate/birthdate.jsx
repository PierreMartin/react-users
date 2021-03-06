import React, { PropTypes } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import classNames from 'classnames/bind';
import styles from './css/style';
const cx = classNames.bind(styles);


const Birthdate = ({ typingLoginSignupUserAction, typingLoginSignupUserState, label, missingRequiredField, currentValue, defaultVal }) => {
  const handleSelectDateChange = (nameField) => {
    return function (event, index, value) {
      typingLoginSignupUserAction(nameField, value);
    };
  };

  return (
    <div className={cx('form-birthdate-container')}>
      <label htmlFor="birthdate">{label}</label>
      <div className={cx('input-birthdate-container')}>
        <SelectField floatingLabelText="Année" className={cx('birthdate-year')} id="birthdate-year" name="birthdateYear" onChange={handleSelectDateChange('birthdateYear')} value={typingLoginSignupUserState.birthdateYear || currentValue && currentValue.year || defaultVal.year} errorText={missingRequiredField.birthDateYear ? 'Saisis l\'année' : ''} >
          <MenuItem value={1897} primaryText="1897" />
          <MenuItem value={1898} primaryText="1898" />
          <MenuItem value={1899} primaryText="1899" />
          <MenuItem value={1900} primaryText="1900" />
          <MenuItem value={1901} primaryText="1901" />
          <MenuItem value={1902} primaryText="1902" />
          <MenuItem value={1903} primaryText="1903" />
          <MenuItem value={1904} primaryText="1904" />
          <MenuItem value={1905} primaryText="1905" />
          <MenuItem value={1906} primaryText="1906" />
          <MenuItem value={1907} primaryText="1907" />
          <MenuItem value={1908} primaryText="1908" />
          <MenuItem value={1909} primaryText="1909" />
          <MenuItem value={1910} primaryText="1910" />
          <MenuItem value={1911} primaryText="1911" />
          <MenuItem value={1912} primaryText="1912" />
          <MenuItem value={1913} primaryText="1913" />
          <MenuItem value={1914} primaryText="1914" />
          <MenuItem value={1915} primaryText="1915" />
          <MenuItem value={1916} primaryText="1916" />
          <MenuItem value={1917} primaryText="1917" />
          <MenuItem value={1918} primaryText="1918" />
          <MenuItem value={1919} primaryText="1919" />
          <MenuItem value={1920} primaryText="1920" />
          <MenuItem value={1921} primaryText="1921" />
          <MenuItem value={1922} primaryText="1922" />
          <MenuItem value={1923} primaryText="1923" />
          <MenuItem value={1924} primaryText="1924" />
          <MenuItem value={1925} primaryText="1925" />
          <MenuItem value={1926} primaryText="1926" />
          <MenuItem value={1927} primaryText="1927" />
          <MenuItem value={1928} primaryText="1928" />
          <MenuItem value={1929} primaryText="1929" />
          <MenuItem value={1930} primaryText="1930" />
          <MenuItem value={1931} primaryText="1931" />
          <MenuItem value={1932} primaryText="1932" />
          <MenuItem value={1933} primaryText="1933" />
          <MenuItem value={1934} primaryText="1934" />
          <MenuItem value={1935} primaryText="1935" />
          <MenuItem value={1936} primaryText="1936" />
          <MenuItem value={1937} primaryText="1937" />
          <MenuItem value={1938} primaryText="1938" />
          <MenuItem value={1939} primaryText="1939" />
          <MenuItem value={1940} primaryText="1940" />
          <MenuItem value={1941} primaryText="1941" />
          <MenuItem value={1942} primaryText="1942" />
          <MenuItem value={1943} primaryText="1943" />
          <MenuItem value={1944} primaryText="1944" />
          <MenuItem value={1945} primaryText="1945" />
          <MenuItem value={1946} primaryText="1946" />
          <MenuItem value={1947} primaryText="1947" />
          <MenuItem value={1948} primaryText="1948" />
          <MenuItem value={1949} primaryText="1949" />
          <MenuItem value={1950} primaryText="1950" />
          <MenuItem value={1951} primaryText="1951" />
          <MenuItem value={1952} primaryText="1952" />
          <MenuItem value={1953} primaryText="1953" />
          <MenuItem value={1954} primaryText="1954" />
          <MenuItem value={1955} primaryText="1955" />
          <MenuItem value={1956} primaryText="1956" />
          <MenuItem value={1957} primaryText="1957" />
          <MenuItem value={1958} primaryText="1958" />
          <MenuItem value={1959} primaryText="1959" />
          <MenuItem value={1960} primaryText="1960" />
          <MenuItem value={1961} primaryText="1961" />
          <MenuItem value={1962} primaryText="1962" />
          <MenuItem value={1963} primaryText="1963" />
          <MenuItem value={1964} primaryText="1964" />
          <MenuItem value={1965} primaryText="1965" />
          <MenuItem value={1966} primaryText="1966" />
          <MenuItem value={1967} primaryText="1967" />
          <MenuItem value={1968} primaryText="1968" />
          <MenuItem value={1969} primaryText="1969" />
          <MenuItem value={1970} primaryText="1970" />
          <MenuItem value={1971} primaryText="1971" />
          <MenuItem value={1972} primaryText="1972" />
          <MenuItem value={1973} primaryText="1973" />
          <MenuItem value={1974} primaryText="1974" />
          <MenuItem value={1975} primaryText="1975" />
          <MenuItem value={1976} primaryText="1976" />
          <MenuItem value={1977} primaryText="1977" />
          <MenuItem value={1978} primaryText="1978" />
          <MenuItem value={1979} primaryText="1979" />
          <MenuItem value={1980} primaryText="1980" />
          <MenuItem value={1981} primaryText="1981" />
          <MenuItem value={1982} primaryText="1982" />
          <MenuItem value={1983} primaryText="1983" />
          <MenuItem value={1984} primaryText="1984" />
          <MenuItem value={1985} primaryText="1985" />
          <MenuItem value={1986} primaryText="1986" />
          <MenuItem value={1987} primaryText="1987" />
          <MenuItem value={1988} primaryText="1988" />
          <MenuItem value={1989} primaryText="1989" />
          <MenuItem value={1990} primaryText="1990" />
          <MenuItem value={1991} primaryText="1991" />
          <MenuItem value={1992} primaryText="1992" />
          <MenuItem value={1993} primaryText="1993" />
          <MenuItem value={1994} primaryText="1994" />
          <MenuItem value={1995} primaryText="1995" />
          <MenuItem value={1996} primaryText="1996" />
          <MenuItem value={1997} primaryText="1997" />
          <MenuItem value={1998} primaryText="1998" />
          <MenuItem value={1999} primaryText="1999" />
          <MenuItem value={2000} primaryText="2000" />
          <MenuItem value={2001} primaryText="2001" />
          <MenuItem value={2002} primaryText="2002" />
          <MenuItem value={2003} primaryText="2003" />
          <MenuItem value={2004} primaryText="2004" />
          <MenuItem value={2005} primaryText="2005" />
          <MenuItem value={2006} primaryText="2006" />
          <MenuItem value={2007} primaryText="2007" />
          <MenuItem value={2008} primaryText="2008" />
          <MenuItem value={2009} primaryText="2009" />
          <MenuItem value={2010} primaryText="2010" />
          <MenuItem value={2011} primaryText="2011" />
          <MenuItem value={2012} primaryText="2012" />
          <MenuItem value={2013} primaryText="2013" />
          <MenuItem value={2014} primaryText="2014" />
          <MenuItem value={2015} primaryText="2015" />
          <MenuItem value={2016} primaryText="2016" />
          <MenuItem value={2017} primaryText="2017" />
        </SelectField>

        <SelectField floatingLabelText="Mois" className={cx('birthdate-month')} id="birthdate-month" name="birthdateMonth" onChange={handleSelectDateChange('birthdateMonth')} value={typingLoginSignupUserState.birthdateMonth || currentValue && currentValue.month || defaultVal.month} errorText={missingRequiredField.birthDateMonth ? 'Saisis le mois' : ''} >
          <MenuItem value={0} primaryText="janv." />
          <MenuItem value={1} primaryText="févr." />
          <MenuItem value={2} primaryText="mars" />
          <MenuItem value={3} primaryText="avr." />
          <MenuItem value={4} primaryText="mai" />
          <MenuItem value={5} primaryText="juin" />
          <MenuItem value={6} primaryText="juil." />
          <MenuItem value={7} primaryText="août" />
          <MenuItem value={8} primaryText="sept." />
          <MenuItem value={9} primaryText="oct." />
          <MenuItem value={10} primaryText="nov." />
          <MenuItem value={11} primaryText="déc." />
        </SelectField>

        <SelectField floatingLabelText="Jour" className={cx('birthdate-day')} id="birthdate-day" name="birthdateDay" onChange={handleSelectDateChange('birthdateDay')} value={typingLoginSignupUserState.birthdateDay || currentValue && currentValue.day || defaultVal.day} errorText={missingRequiredField.birthDateDay ? 'Saisis le jour' : ''} >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={7} primaryText="7" />
          <MenuItem value={8} primaryText="8" />
          <MenuItem value={9} primaryText="9" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={11} primaryText="11" />
          <MenuItem value={12} primaryText="12" />
          <MenuItem value={13} primaryText="13" />
          <MenuItem value={14} primaryText="14" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={16} primaryText="16" />
          <MenuItem value={17} primaryText="17" />
          <MenuItem value={18} primaryText="18" />
          <MenuItem value={19} primaryText="19" />
          <MenuItem value={20} primaryText="20" />
          <MenuItem value={21} primaryText="21" />
          <MenuItem value={22} primaryText="22" />
          <MenuItem value={23} primaryText="23" />
          <MenuItem value={24} primaryText="24" />
          <MenuItem value={25} primaryText="25" />
          <MenuItem value={26} primaryText="26" />
          <MenuItem value={27} primaryText="27" />
          <MenuItem value={28} primaryText="28" />
          <MenuItem value={29} primaryText="29" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={31} primaryText="31" />
        </SelectField>
      </div>
    </div>
  );
};

Birthdate.propTypes = {
  typingLoginSignupUserAction: PropTypes.func.isRequired,
  typingLoginSignupUserState: PropTypes.object.isRequired,
  label: PropTypes.string,
  missingRequiredField: PropTypes.object
};

export default Birthdate;