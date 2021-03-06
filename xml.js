let xmltemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<sheet name="Mothership">
  <metadata>
    <version>0</version>
    <author>Gabriel A. Zorrilla</author>
    <contact>@GabrielZorrilla</contact>
    <website>https://zorrilla.me</website>
    <notes></notes>
    <released></released>
    <updated></updated>
  </metadata>
  <configuration>
    <color_front>"white"</color_front>
    <color_back>"black"</color_back>
    <columns>20</columns>
  </configuration>
  <calculations>
    <calc name ="strength">strength+mod_strength</calc>
    <calc name ="speed">speed+mod_speed</calc>
    <calc name ="intellect">intellect+mod_intellect</calc>
    <calc name ="combat">combat+mod_combat</calc>
  </calculations>
  <section name="basic information">
    <row>1-1</row>
    <col>1-20</col>
    <label>
      <value>basic information</value>
      <format>capitalize</format>
    </label>
    <group name="basic_information">
      <orientation>row</orientation>
      <field name="basics_name">
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>text</type>
        <size>50</size>
        <max_chars>32</max_chars>
        <label>
          <position>last</position>
          <value>name</value>
          <format>capitalize</format>
          <size>50</size>
        </label>
      </field>
      <field name="basics_level">
        <values>
          <value>9</value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>10</size>
        <max_chars>2</max_chars>
        <label>
          <position>last</position>
          <value>level</value>
          <format>capitalize</format>
          <size>10</size>
        </label>
      </field>
      <field name="basics_title">
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>text</type>
        <size>40</size>
        <max_chars>16</max_chars>
        <label>
          <position>last</position>
          <value>rank/title</value>
          <format>capitalize</format>
          <size>40</size>
        </label>
      </field>
      <field name='xp'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>xp</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='class'>
        <option name="teamster">
          <mod name="strength">5</mod>
          <mod name="speed">5</mod>
        </option>
        <option name="scientist">
          <mod name="intellect">10</mod>
        </option>
        <orientation>column</orientation>
        <type>combo</type>
        <size>1</size>
        <label>
          <max_chars></max_chars>
          <position>last</position>
          <value>class</value>
          <format>capitalize</format>
        </label>
      </field>
    </group>
  </section>
  <section name='vitals'>
    <row>2-2</row>
    <col>1-5</col>
    <label>
      <value>vitals</value>
      <format>capitalize</format>
    </label>
    <group name='g_vitals'>
      <orientation>column</orientation>
      <field name='stress'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>2</max_chars>
          <position>last</position>
          <value>stress</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='resolve'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>2</max_chars>
          <position>last</position>
          <value>resolve</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='health'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>health</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='max_health'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>max health</value>
          <format>capitalize</format>
        </label>
      </field>
    </group>
  </section>
  <section name='stats'>
    <row>2-2</row>
    <col>6-10</col>
    <label>
      <value>Stats</value>
      <format>capitalize</format>
    </label>
    <group name='g_stats'>
      <orientation>column</orientation>
      <field name='strength'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>strength</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='speed'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>speed</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='intellect'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>intellect</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='combat'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>combat</value>
          <format>capitalize</format>
        </label>
      </field>
    </group>
  </section>
  <section name='saves'>
    <row>2-2</row>
    <col>11-15</col>
    <label>
      <value>saves</value>
      <format>capitalize</format>
    </label>
    <group name='g_saves'>
      <orientation>column</orientation>
      <field name='sanity'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>sanity</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='fear'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>fear</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='body'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>body</value>
          <format>capitalize</format>
        </label>
      </field>
      <field name='armor'>
        <values>
          <value></value>
        </values>
        <orientation>column</orientation>
        <type>number</type>
        <size>1</size>
        <label>
          <max_chars>3</max_chars>
          <position>last</position>
          <value>armor</value>
          <format>capitalize</format>
        </label>
      </field>
    </group>
  </section>
  <section name='skills'>
    <row>2-2</row>
    <col>16-20</col>
    <label>
      <value>skills</value>
      <format>capitalize</format>
      <button name='add'></button>
    </label>
    <group name='g_skills'>
      <orientation>column</orientation>
    </group>
  </section>
</sheet>`;